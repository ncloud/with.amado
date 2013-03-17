<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class APP_Controller extends CI_Controller {
	protected $debug;

	protected $user_data;
	protected $data;
	protected $site;

    protected $language;

	public $facebook; // for Facebook
	
    function __construct()
    {
        parent::__construct();
        
        $this->load->library('auth');
        $this->load->library('input');
        $this->load->library('layout');
        
        $this->load->model('m_site');

        $this->load->model('m_user');
        $this->load->model('m_user_token');

        $this->load->library('session');
		
		$this->debug = false;
		if($this->config->item('dev_mode')) {
			 $this->debug = true;
		}
		
        // Redirect... http://beta.example.com -> http://www.example.com
        if(!$this->input->is_cli_request()) {
        	$t = str_replace(array('http://','https://'),'',$this->config->item('base_url'));
        	if($t_i = strpos($t, '/')) {
        		$t = substr($t, 0, $t_i);
        	}

            if($_SERVER['HTTP_HOST'] != $t) {
                redirect($this->config->item('base_url') . substr($_SERVER['REQUEST_URI'],1));
            }   
        }

        $this->site = $this->m_site->get_by_host($_SERVER['HTTP_HOST']);
        
        
		if ($this->auth->logged_in())
		{
			$this->user_data = $this->auth->get_user();

            if($this->user_data->vendor_id == FACEBOOK_VENDOR) {
                $t =  explode('_',$this->user_data->username);  
                $this->user_data->fb_id = $t[1]; // for Facebook userid
				$this->user_data->profile = 'https://graph.facebook.com/'.$this->user_data->fb_id.'/picture';
            } else {
                $this->user_data->fb_id = 0;
				$this->user_data->profile ='';
            }

		} 
		else 
		{
			$this->user_data 		= new StdClass;
			$this->user_data->id 	= 0;
		}
        
	    $this->data = array();
		
		// --
		
	    if(!$this->input->is_cli_request()) {
            // ? redirect GET error
            if(strpos($_SERVER['REQUEST_URI'],'?') !== false) {
                $this->config->set_item('enable_query_strings', FALSE);
            }
        }
        
		if($this->input->is_ajax_request()) {
		    $this->layout->setLayout('layouts/empty');
		} else {
		//	$this->output->enable_profiler(TRUE);

			if($this->router->class == 'user' && in_array($this->router->method,array('login_facebook','logout'))) 
			{
				// 로그인 시 레이아웃 기능 제외
			    $this->layout->setLayout('layouts/empty');
			}
			else
			{
				$this->set('now', '');
			}
		}
        
        $this->set('debug_mode', $this->debug);
        
        if(!$this->input->is_cli_request()) {
            $this->set('mobile_mode', $this->detect_mobile());
        }
        
		$this->layout->setTitle('아마도.함께');
		
		require_once(APPPATH . '/vendors/Facebook/facebook' . EXT);
		
		$this->facebook = new Facebook(array(
			'appId'  => $this->config->item('facebook_appid'),
			'secret' => $this->config->item('facebook_secret'),
			'cookie' => true,
		));	

		$notice_message = $this->session->userdata('notice_message');
		$this->session->unset_userdata('notice_message');

		$this->set('notice_message', $notice_message);
    }

    protected function set_notice_message($message)
    {
    	$this->session->set_userdata('notice_message', $message);
    }

    protected function check_and_redirect_page()
    {
        if(!$this->user_data->id) {
            redirect('/');
        }
    }
    
    protected function go_exit()
    {
        exit;
    }
    
    protected function check_and_go_exit()
    {
        if(!$this->user_data->id) {
            $this->go_exit();
        }
    }
	
	protected function logged() 
	{
		$this->load->library('session');
		return $this->session->userdata('auth')?true:false;
	}
	
	public function redirect_script($uri) 
	{
		$this->layout->setLayout('layouts/simple');
		$this->set('uri', $uri);
		$this->view('actions/redirect_script');
	}
	
	public function ajax($data = false, $reputation = false) {
		$output = new StdClass;
		$output->success = true;
        
		if($data) $output->data = $data;
        if($reputation) $output->reputation = $reputation;
        
		echo json_encode($output);
	}
	
	public function ajax_error($error_message, $error_code = '') {
		$error = new StdClass;
		$error->success = false;
		$error->error_message = $error_message;
		$error->error_code = $error_code;
		
		echo json_encode($error);
	} 

	public function detect_mobile()
	{
	    if(!isset($_SERVER['HTTP_USER_AGENT'])) return false;
        
	    $_SERVER['ALL_HTTP'] = isset($_SERVER['ALL_HTTP']) ? $_SERVER['ALL_HTTP'] : '';
	 
	    $mobile_browser = '0';
	 
	    $agent = strtolower($_SERVER['HTTP_USER_AGENT']);
        
        if(substr($agent,0,8) == 'facebook') return false; // facebook bot
	 
	    if(preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|iphone|ipad|ipod|android|xoom)/i', $agent))
	        $mobile_browser++;
	 
	    if((isset($_SERVER['HTTP_ACCEPT'])) and (strpos(strtolower($_SERVER['HTTP_ACCEPT']),'application/vnd.wap.xhtml+xml') !== false))
	        $mobile_browser++;
	 
	    if(isset($_SERVER['HTTP_X_WAP_PROFILE']))
	        $mobile_browser++;
	 
	    if(isset($_SERVER['HTTP_PROFILE']))
	        $mobile_browser++;
	 
	    $mobile_ua = substr($agent,0,4);
	    $mobile_agents = array(
	                        'w3c ','acs-','alav','alca','amoi','audi','avan','benq','bird','blac',
	                        'blaz','brew','cell','cldc','cmd-','dang','doco','eric','hipt','inno',
	                        'ipaq','java','jigs','kddi','keji','leno','lg-c','lg-d','lg-g','lge-',
	                        'maui','maxo','midp','mits','mmef','mobi','mot-','moto','mwbp','nec-',
	                        'newt','noki','oper','palm','pana','pant','phil','play','port','prox',
	                        'qwap','sage','sams','sany','sch-','sec-','send','seri','sgh-','shar',
	                        'sie-','siem','smal','smar','sony','sph-','symb','t-mo','teli','tim-',
	                        'tosh','tsm-','upg1','upsi','vk-v','voda','wap-','wapa','wapi','wapp',
	                        'wapr','webc','winw','xda','xda-'
	                        );
	 
	    if(in_array($mobile_ua, $mobile_agents))
	        $mobile_browser++;
	 
	    if(strpos(strtolower($_SERVER['ALL_HTTP']), 'operamini') !== false)
	        $mobile_browser++;
	 
	    // Pre-final check to reset everything if the user is on Windows
	    if(strpos($agent, 'windows') !== false)
	        $mobile_browser=0;
	 
	    // But WP7 is also Windows, with a slightly different characteristic
	    if(strpos($agent, 'windows phone') !== false)
	        $mobile_browser++;
	 
	    if($mobile_browser>0)
	        return true;
	    else
	        return false;
	}
	
	public function get_user_data() { return $this->user_data; }

    protected function set($key, $data) 
    {
    	$this->data[$key] = $data;
    }
    
    protected function get($key) 
    {
    	if(!isset($this->data[$key])) return false;
    	return $this->data[$key];
    }
    
    protected function view($name, $data = null, $return = false) 
    {
        $this->set('current_user', $this->user_data);
                
    	if($data == null) {
    		$data = $this->data;
    	} else {
	    	$data = array_merge($this->data, $data);
	    }
        
    	return $this->layout->view($name, $data, $return);
    }
}