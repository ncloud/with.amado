<?php
class Page extends APP_Controller {
    function __construct() 
    {
        parent::__construct();
        
        $this->load->driver('minify');

        // style
        $min_filename = 'compress/all.' . $this->config->item('app_version') . '.css';
        if($this->debug || !file_exists(APPPATH . 'webroot/css/' . $min_filename)) {
            $files = array( //APPPATH . 'webroot/css/lib/normalize.css',
                            APPPATH . 'webroot/css/lib/reset.css',
                            APPPATH . 'webroot/css/plugin/pickadate.css',
                            APPPATH . 'webroot/css/plugin/datetime.css',                            
                            APPPATH . 'webroot/css/lib/960.css',
                            APPPATH . 'webroot/css/lib/ui.css',
                            APPPATH . 'webroot/css/lib/layout.css');
            $min_contents = $this->minify->combine_files($files, 'css', $this->debug ? false : true);
            file_put_contents(APPPATH . 'webroot/css/' . $min_filename, $min_contents);
        }
        
        // script
        $min_filename = 'compress/all.' . $this->config->item('app_version') . '.js';
        if($this->debug || !file_exists(APPPATH . 'webroot/js/' . $min_filename)) {
            $files = array( APPPATH . 'webroot/js/lib/basic.js',
                            APPPATH . 'webroot/js/plugin/pickadate.js',
                            APPPATH . 'webroot/js/plugin/jquery.datetime.js',
                            APPPATH . 'webroot/js/lib/user.js',
                            APPPATH . 'webroot/js/lib/less.js');
                          
            $min_contents = $this->minify->combine_files($files, 'js', $this->debug ? false : true);
            file_put_contents(APPPATH . 'webroot/js/' . $min_filename, $min_contents);
        }
    }
    
    public function index()
    {
        if($this->user_data->id) {
            $this->view('dashboard');
        } else {
           $this->view('index');
        }
    }

    function join()
    {
        // Join disable
        redirect('/');

        if(!empty($this->user_data->id)) // 로그인 되어 있으면
        {
            redirect('/');
            return false;
        }

        $this->set('join_mode', false);
        $this->view('page/login_or_join');
    }
    
    function login() {
        if(!empty($this->user_data->id)) // 로그인 되어 있으면
        {
            redirect('/');
            return false;
        }

        $this->view('page/login');
    }

    function welcome() // 첫 로그인 시에 ..
    {

    }

    function create() // 만들기
    {
        if(!$this->user_data->id) {
            redirect('/');

            return false;
        }
        $errors = array();
        if(isset($_POST) && !empty($_POST)) {
            $this->load->model('m_event');

            $data = $this->__create($_POST, $errors);
            if($data) {
                if($event_id = $this->m_event->create($data)) {
                    if(isset($data->url)) {
                        redirect('/' . $data->url);
                    }

                    redirect('/' . $event_id);
                }
            }
        }

        $this->set('errors', $errors);
        $this->set('defaults', $_POST);

        $this->view('page/create');
    }

    public function event($url)
    {
        $this->load->model('m_event');

        if($event = $this->m_event->get_by_url($this->site->id, $url)) {
            $this->set('event', $event);

            $this->view('page/view');
        } else {
            // wrong event
            redirect('/');
        }
        
    }

    private function __create($form, &$errors)
    {
        $data = new StdClass;

        /// ---- 필수 ----
        // 제목
        if(!isset($form['title']) || empty($form['title'])) {
           $errors['title'] = '제목을 입력해주세요.';
           return false;
        } else { $data->title = $form['title']; }

        $min = date('Y-m-d', mktime());
        $min_full = date('Y-m-d H:i:s', mktime());

         // 모임날짜
        if(!isset($form['rsvp_start_date']) || empty($form['rsvp_start_date'])) {
           $errors['rsvp_start_date'] = '날짜가 비어있습니다.';
           return false;
        } else { 

            $rsvp_start_date = $form['rsvp_start_date'];
            if(strtotime($rsvp_start_date) < strtotime($min)) {
                $errors['rsvp_start_date'] = '지정한 날짜 [' . $rsvp_start_date . ']에 모임을 만들 수 없습니다.';
                return false;
            }

            if(!empty($form['rsvp_start_time'])) {
                $rsvp_start_time = $form['rsvp_start_time'];
                if(strtotime($rsvp_start_date . ' ' . $rsvp_start_time) < strtotime($min_full)) {
                $errors['rsvp_start_date'] = '지정한 날짜 [' . $rsvp_start_date . ' ' . $rsvp_start_time . ']에 모임을 만들 수 없습니다.';
                return false;
                }

                $data->rsvp_start_time = $rsvp_start_date . ' ' . $rsvp_start_time;
            } else {
                $data->rsvp_start_time = $rsvp_start_date . ' ' . '00:00:00';
            }
        }       

        // 모임 종료 날짜
        if(!isset($form['set_rsvp_end']) && $form['set_rsvp_end'] = 'true' && isset($form['rsvp_end_date']) && !empty($form['rsvp_end_date'])) {
            $rsvp_end_date = $form['rsvp_start_date'];
            if(strtotime($rsvp_end_date) < strtotime($rsvp_start_date)) {
                $errors['rsvp_end_date'] = '지정한 종료 날짜 [' . $rsvp_end_date . ']에 모임을 만들 수 없습니다.';
                return false;
            }

            if(!empty($form['rsvp_end_date'])) {
                $rsvp_end_date = $form['rsvp_end_date'];
                if(strtotime($rsvp_end_date . ' ' . $rsvp_end_date) < strtotime($$data->rsvp_start_time)) {
                $errors['rsvp_end_date'] = '지정한 종료 날짜 [' . $rsvp_end_date . ' ' . $rsvp_end_time . ']에 모임을 만들 수 없습니다.';
                return false;
                }

                $data->rsvp_end_time = $rsvp_end_date . ' ' . $rsvp_end_time;
            } else {
                $data->rsvp_end_time = $rsvp_end_date . ' ' . '00:00:00';
            }
        }


        // 정원
        if(!isset($form['rsvp_max']) || empty($form['rsvp_max'])) {
           $errors['rsvp_max'] = '정원이 비어있습니다.';
           return false;
        } else { 
            $data->rsvp_max = $form['rsvp_max'];
            if(!is_numeric($data->rsvp_max)) {
                $errors['rsvp_max'] = '정원값은 숫자여야 합니다.';
                return false;
            }

            if(!($data->rsvp_max > 0 && $data->rsvp_max <= 10)) {
                $errors['rsvp_max'] = '정원은 범위는 1~10명까지입니다.';
                return false;
            }
        }

        /// ---- 기본 ----
        $data->site_id = $this->site->id;
        $data->user_id = $this->user_data->id;

        /// ---- 선택 ----
        $data->description = isset($form['description']) ? $form['description'] : '';
        $data->opt_enable_private_join = isset($form['opt_enable_private_join']) && $form['opt_enable_private_join'] == 'on' ? 'yes' : 'no';
        $data->opt_add_input_contact = isset($form['opt_add_input_contact']) && $form['opt_add_input_contact'] == 'on' ? 'yes' : 'no';

        if($url = (isset($form['url']) && !empty($form['url']) ? $form['url'] : false)) {

            if(is_numeric($url)) {
                $errors['url'] = '주소는 숫자만으로 이루어질 수 없습니다.';
                return false;
            }

            if(strlen($url) <= 5) {
                $errors['url'] = '주소는 최소 6자 이상이 되어야 합니다.';
                return false;
            }

            if(in_array($url, array('join','signin','signout','login','logout','admin','owner','official','create','delete','welcome','search','find'))) {
                $errors['url'] = '사용하실 수 없는 주소입니다.';
                return false;
            }

            if(preg_match('/([a-zA-Z0-9\.]+)/', $url, $matches)) {
                $check_url = $matches[0];

                if(strcmp($check_url,$url) != 0) {
                    $errors['url'] = '주소는 알파벳과 숫자 그리고 점(.)만으로 이루어져야 합니다.';
                    return false;
                }
            }

            if(!$this->m_event->check_url_exists($this->site->id, $url)) {
                $data->url = $url;
            } else {
                $errors['url'] = '이미 사용중인 주소입니다.';
                return false;
            }
        }

        return $data;
    }
}
?>