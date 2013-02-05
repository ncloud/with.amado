<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class M_User extends CI_Model
{
    //----------------------- PUBLIC METHODS --------------------------//

    //----------------------- STATIC METHODS --------------------------//
    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    //----------------------- PUBLIC METHODS --------------------------//

    public function get($id, $all_field = false)
    {
        if(is_numeric($id)) 
        {
            $where = array('id'=>$id);
        } else if(is_string($id)) {
            $where = array('username'=>$id);
        } else {
            return false;
        }
        
        if($all_field) {
            $result = $this->db->get_where('users', $where)->row();
        } else {
            $result = $this->db->from('users')->select('id, vendor_id, username, name, display_name, profile, language, login_count')->where($where)->get()->row();
        }
        
        return $this->combine_user_data($result);
    }
    
    public function gets()
    {
        return $this->db->from('users')
            ->get()->result();
    }
    
    public function get_datas($user_ids, $all_field = false)
    {
        if(!count($user_ids)) return false;
        
        $this->db->from('users')->where_in('id', $user_ids);
        
        if(!$all_field) {
            $this->db->select('id, vendor_id, username, name, display_name, profile, language, login_count');
        }
        
        $user_result = array();
        $result = $this->db->get()->result();
        foreach($result as $user) $user_result[$user->id] = $this->combine_user_data($user);
        unset($result);   
        
        return $user_result;
    }
    
    
    public function get_by_username($username) 
    {
        $result = $this->db->get_where('users',array('username'=>$username))->row();
        
        return $this->combine_user_data($result);
    }

    public function get_by_email($email)
    {
        $result = $this->db->get_where('users',array('email'=>$email))->row();
        
        return $this->combine_user_data($result);
    }
    
    public function gets_users_by_vendor_ids($user_ids, $vendor_id = FACEBOOK_VENDOR) {
       return $this->db->from('users')->where('vendor_id', $vendor_id)->where_in('vendor_user_id', $user_ids)->get()->result();
    }
    
    public function gets_by_ids($user_ids)
    {
         return $this->db->from('users')->where_in('id',$user_ids)->get()->result();
    }
        
    public function is_verified($user_id)
    {
        $result = $this->db->from('users')->where('id', $user_id)->select('is_verified')->get()->row();
        if($result) {
            return $result->is_verified;
        } else {
            return 'no';
        }
    }
    
    //----------------------- STATIC METHODS --------------------------//
    
    public function combine_user_data($user_data)
    {
        if(empty($user_data)) return false;
        if(empty($user_data->profile)) {
            $user_data->is_default_profile = true;
            
            $user_data->profile = site_url('/img/content/icon_default_profile.png');
            $user_data->profile_original = site_url('/img/content/icon_default_profile_big.png');
        } else {
            $user_data->is_default_profile = false;
            
            if(!isset($user_data->profile_original)) {
                if(strpos($user_data->profile, 'http://') !== false) {
                    $user_data->profile_original = $user_data->profile . '?type=large';
                } else {
                    $profile_value = $user_data->profile;
                    $user_data->profile = site_url('/files/uploads/profile/resize/small_' . $profile_value);
                    $user_data->profile_original = site_url('/files/uploads/profile/resize/normal_' . $profile_value);
                }
            }
        }
                
        $user_data->permalink = !empty($user_data->link_name) ? site_url('/'.$user_data->link_name) : site_url('/user/'.$user_data->id);

        return $user_data;
    }

    /**
     * Create a New User
     *
     * @param Validation_Object $post
     * @return int Id of the newly created user
     * @static
     */
    public function create($post)
    {
        $this->load->library('input');
        $this->load->library('user_agent');
        $this->load->helper('email');
        $this->load->helper('string');
    
        //-- Fetch User Input
        $username           = $post->username;
        $email              = $post->email;
        $password           = $post->password;
        $password_confirm   = $post->password_confirm;
        $name               = isset($post->name) ? $post->name : $username;
        $display_name       = isset($post->display_name) ? $post->display_name : $name;
        $role_name          = 'login';

        //-- Sanitize
        if($username == '')
            throw new Exception('Username field is required.');
        //TODO: Verify existance of this username
        if($email == '')
            throw new Exception('Email field is required.');
        if(valid_email($email) == FALSE)
            throw new Exception('Invalid email address format.');
        //TODO: Verify existance of this email
        if($password == '')
            throw new Exception('Password field is required.');
        if($password != $password_confirm)
        {
            throw new Exception('Retype password does not match.');
        }

        //-- Create new user
        $user                       = new StdClass;
        $user->username             = $username;
        $user->name                 = $name;
        $user->display_name         = $display_name;
        $user->email                = $email;
        $user->password             = $this->auth->password($password);
        $user->link_name            = isset($post->link_name) ? $post->link_name : null;
        $user->activation_key       = strtolower(random_string('alnum', 32));
        $user->last_ip_address      = $this->input->ip_address();
        $user->last_user_agent      = $this->agent->agent_string();
        $user->create_time          = $this->date->timestamp();
        
        //-- Insert user and its role
        if($this->db->insert('users', $user))
        {
            $user->id = $this->db->insert_id();
            
            $role_data      = $this->db->get_where('roles',array('name'=> $role_name))->row();
            
            $role           = new StdClass;
            $role->user_id  = $user->id;
            $role->role_id  = $role_data->id;
            
            $this->db->insert('role_users', $role);  
            
            return $user->id;
        }
        else
        {
            throw new Exception('Failed to save user and/or create its role.');
        }
    }

    /**
     * Authenticate an User
     *
     * @param Validation_Object $post
     * @static
     */
    public function authenticate($username, $password)
    {
        $this->load->library('auth');

        //-- Sanitize
        if($username == '')
            throw new Exception('Username field is required');
        if($password == '')
            throw new Exception('Password field is required');

        //-- Authorise
        //TODO: Catch error upon $auth->login()
        $user = $this->db->get_where('users', array('username'=>$username))->row();

        if (empty($user))
        {//-- No matching Username
            return false;
        }
        elseif ($this->auth->login($username, $password))
        {//-- Login Success
            return true;
        }
        else
        {//-- Incorrect Password
            return false;
        }
    }
    
    // ncloud
    public function authenticate_vendor($vendor_name, $uid, $name, $display_name, $profile = '', $email = '', $gender = '')
    {
        $this->load->library('auth');
        $this->load->library('input');
        $this->load->library('user_agent');
        $this->load->helper('string');

        $username = $vendor_name . '_' . $uid;

        $vendors = array('facebook'=>FACEBOOK_VENDOR, 'twitter'=>TWITTER_VENDOR);       
        $vendor_id = $vendors[$vendor_name];

        $user = $this->db->from('users')->where(array('username' => $username, 'vendor_id' => $vendor_id))->get()->row();
        
        if(!empty($user)) {
            $user->now_joined = false;

            if($user->display_name != $display_name  || $user->profile != $profile) {
                $user->display_name = $display_name;
                $user->profile = $profile;
                
                $this->db->where('id', $user->id);
                $this->db->update('users', $user);
            }       
            $this->auth->login($user->username, $user->random_password);
            
            return $user;
        } else {    
            $role_name                  = 'login';
            $password                   = strtolower(random_string('alnum', 32));
            
            $user                       = new StdClass;          
            $user->profile              = $profile;
            $user->username             = $username;
            $user->vendor_id            = $vendor_id;
            $user->vendor_user_id       = $uid;
            $user->name                 = $name;  
            $user->display_name         = $display_name; // NOTE: Temperary until user able to assign display name upon registration
            $user->password             = $this->auth->password($password);
            $user->random_password      = $password;
            $user->activation_key       = strtolower(random_string('alnum', 32));
            $user->last_ip_address      = $this->input->ip_address();
            $user->last_user_agent      = $this->agent->agent_string();
            $user->create_time          = $this->date->timestamp();

            //-- Insert user and its role
            if($this->db->insert('users', $user))
            {
                $user->id = $this->db->insert_id();
                $user->now_joined = true;
                
                $role_data      = $this->db->get_where('roles',array('name'=> $role_name))->row();
                
                $role           = new StdClass;
                $role->user_id  = $user->id;
                $role->role_id  = $role_data->id;
                
                $this->db->insert('role_users', $role);  
                
                $this->auth->login($username, $password);
                
                return $user;
            }
            else
            {
                throw new Exception('Failed to save user and/or create its role.');
            }   
            
        }
    }

    public function update_login_count($user) 
    {
        if(!is_object($user)) {
            $user = $this->get($user);
        }
        
        $user->login_count += 1;
        $user->last_login_time   = $this->date->timestamp();
        
        $this->db->where('id', $user->id);
        $this->db->update('users', $user);
    }
    
    public function update($user_id, $data, $modify_time = true) 
    {
        if($modify_time) $data->modify_time   = $this->date->timestamp();
        
        $this->db->where('id', $user_id);
        $this->db->update('users', $data);
    }

    public function update_field($user_id, $field, $vlaue)
    {
        $data = new StdClass;
        $data->{$field} = $vlaue;
        
        $this->db->where('id', $user_id);
        $this->db->update('users', $data);
    }
    
    public function increment_count($user_id, $field, $value = 1)
    {
        $this->db->set($field, $field . ' + ' . $value, FALSE);
        $this->db->where('id', $user_id);
        $this->db->update('users');
    }
    
    public function decrement_count($user_id, $field, $value = 1)
    {
        $this->db->set($field, $field . ' - ' . $value, FALSE);
        $this->db->where('id', $user_id);
        $this->db->update('users');
    }
    
    public function update_count($user_id, $field, $count)
    {
        $data = new StdClass;
        $data->{$field} = $count;
        
        $this->db->where('id', $user_id);
        $this->db->update('users', $data);
    }
    
    //----------------------- PRIVATE METHODS --------------------------//

}//END class