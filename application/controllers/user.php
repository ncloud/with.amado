<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends APP_Controller
{
    /**
     * Users Controller Constructor
     */
    public function __construct()
    {
        parent::__construct(); //-- This must be included
    }

    function login()
    {
        $result = new StdClass;
        $result->success = false;
        
        if(!empty($this->user_data->id)) {
            $result->message = 'Already Login';    
        } else {
            $email = isset($_POST['email']) ? $_POST['email'] : false;
            $password = isset($_POST['password']) ? $_POST['password'] : false;
            
            if($email === false || $password === false) {
                $result->message = lang('already_join_email');
            } else {
                $this->load->model('m_user');
                $this->load->helper('email');
                
                $user = false;
                
                if(!valid_email($email)) {
                    $result->message = lang('not_validate_email');
                } else {
                    $user = $this->m_user->get_by_email($email);
                    
                    if($user) {
                       if($this->m_user->authenticate($user->username, $password)) {
                          $result->success = true;
                          $result->logged = true; 
                       } else {
                          $result->message = lang('wrong_email_or_password');
                       }
                    } else {
                        $result->message = lang('wrong_email_or_password');
                    }
                }
            }
        }
        
        echo json_encode($result);
    }
    
    function join()
    {
        $result = new StdClass;
        $result->success = false;
        
        if(!empty($this->user_data->id)) {
            $result->message = 'Already Login';    
        } else {
            $email = isset($_POST['email']) ? $_POST['email'] : false;
            $password = isset($_POST['password']) ? $_POST['password'] : false;
            $username = isset($_POST['username']) ? $_POST['username'] : false;
            
            if($email === false || $password === false || $username === false) {
                $result->message = lang('empty_field');
            } else {
                $this->load->model('m_user');
                $this->load->helper('email');
                
                $user = false;
                
                if(!valid_email($email)) {
                    $result->message = 'Not validate email';
                } else {
                    $user = $this->m_user->get_by_email($email);
                
                    if($user) { // 이미 가입되어 있음
                        $result->message = lang('already_join_email');
                    } else {
                        if(empty($username) || strlen($username) <= 2) {
                            $result->message = lang('username_require_over_three_letter');
                        } else if(is_numeric($username)) {
                            $result->message = lang('username_not_number');
                       } else {
                            $post = new StdClass;
                            $post->username = 'email_' . $email;
                            $post->email = $email;
                            $post->password = $password;
                            $post->password_confirm = $password;
                            $post->name = $post->display_name = $username;
                                                
                            if($user_id = $this->m_user->create($post)) {
                                $result->success = true;
                                
                                $result->data = new StdClass;
                                $result->data->id = $user_id;
                                
                                if($this->m_user->authenticate($post->username, $post->password)) {
                                    $result->logged = true;
                                } else {
                                    $result->logged = false;
                                }
                            }  
                        }
                    }
                }
            }
        }
        
        echo json_encode($result);
    }
    
    /**
     * 페이스북 로그인
     */
    function login_facebook($redirect_uri='') 
    {
        if($redirect_uri == '') {
            $request_uri = $_SERVER['REQUEST_URI'];
            if($pos = strpos($request_uri,'?')) $request_uri = substr($request_uri,$pos + 1);
            
            parse_str($request_uri, $queries);
            if(isset($queries['redirect_uri'])) $redirect_uri = $queries['redirect_uri'];
        }
        
        if(!empty($this->user_data->id))
        {//-- Already logged in as s Someone
            //TODO: Display 'Already Logged In' Error Page
            show_error('You have already logged in to the website', 500, 'Already Logged In.');
        }
        else 
        {
            $this->load->library('validation');

            if(!isset($this->facebook)) 
            {
                show_error('잘못된 접근입니다.');
            } 
            else if(!empty($this->user_data->id)) 
            {//-- Already logged in as someone
                //TODO: Display 'Already Logged In' Error Page
                show_error('You have already logged in to the website', 500, 'Already Logged In.');
            } else {
              $me = null;       
    
              try {
                $uid = $this->facebook->getUser();
                try {
                    $me = $this->facebook->api($uid);
                } catch (FacebookApiException $ex) {    
                    show_error('로그인을 실패했습니다. Caught exception: '.$ex->getMessage(), 500, '로그인 실패.');
                }

                if($me) {
                    // check already;
                    try
                    {
                        $profile = 'http://graph.facebook.com/' . $me['id'] . '/picture';
                        
                        $display_name = isset($me['username']) ? $me['username'] : $me['name'];
                        $email = isset($me['email']) ? $me['email'] : '';
                        
                        $user = $this->m_user->authenticate_vendor('facebook', $me['id'], $me['name'], $display_name, $profile, $email);
                        if($user->now_joined) { // 지금 첫 가입했을 경우 ..
                           
                        }
                        
                        $this->facebook->setExtendedAccessToken();
                        $token = $this->facebook->getAccessToken();

                        $this->m_user_token->update($user->id, $this->config->item('lifetime'), FACEBOOK_VENDOR, $token);
                        
                        if($user->now_joined) {
                            redirect('/step/welcome');
                        } else {
                            if($redirect_uri)
                                redirect($redirect_uri);
                            else
                                redirect('/');
                        }
                    }
                    catch(Exception $ex)
                    {
                        //TODO: Instead of throw Kohana Error page, redirect back to this method with error message displayed.
                        show_error('로그인을 실패했습니다. Caught exception: '.$ex->getMessage(), 500, '로그인 실패.');
                    }
                }
              } catch (FacebookApiException $ex) {
                    show_error('로그인을 실패했습니다. Caught exception: '.$ex->getMessage(), 500, '로그인 실패.');
              }
            }
        }
    }

    /**
     * 로그아웃
     */
    public function logout($redirect_uri = '')
    {
        $this->load->library('auth');
        
        if($redirect_uri == '') {
            $request_uri = $_SERVER['REQUEST_URI'];
            if($pos = strpos($request_uri,'?')) $request_uri = substr($request_uri,$pos + 1);
            
            parse_str($request_uri, $queries);
            if(isset($queries['redirect_uri'])) $redirect_uri = $queries['redirect_uri'];
        }
        
        if(!empty($this->user_data->id)) {
            switch($this->user_data->vendor_id) {
                case FACEBOOK_VENDOR:
                    if(isset($this->facebook)) {
                        $this->facebook->destroySession();
                        $this->config->set_item('facebook_session', null);  
                    }
                break;
            }
        }

        //-- Log Out
        $this->auth->logout();

        //-- Redirect
        redirect('/');
    }

    //----------------------- PLACE HOLDERS --------------------------//

}//END class