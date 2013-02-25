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
                            APPPATH . 'webroot/css/plugin/humanmsg.css',                            
                            APPPATH . 'webroot/css/plugin/tipsy.css',                            
                            APPPATH . 'webroot/css/plugin/facebox.css',                            
                            APPPATH . 'webroot/css/plugin/dropkick.css',                            
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
                            APPPATH . 'webroot/js/plugin/jquery.humanmsg.js',
                            APPPATH . 'webroot/js/plugin/jquery.textchange.js',
                            APPPATH . 'webroot/js/plugin/jquery.tipsy.js',
                            APPPATH . 'webroot/js/plugin/jquery.facebox.js',
                            APPPATH . 'webroot/js/plugin/jquery.dropkick.js',
                            //APPPATH . 'webroot/js/plugin/jquery.masonry.js',
                            APPPATH . 'webroot/js/lib/user.js',
                            APPPATH . 'webroot/js/lib/less.js');
                          
            $min_contents = $this->minify->combine_files($files, 'js', $this->debug ? false : true);
            file_put_contents(APPPATH . 'webroot/js/' . $min_filename, $min_contents);
        }
    }
    
    public function index()
    {
        if($this->user_data->id) {
            $this->load->model('m_event');

            $event_ids = array();

            $events_by_me = $this->m_event->gets_by_me($this->site->id, $this->user_data->id);
            if($events_by_me) foreach($events_by_me as $event) $event_ids[$event->id] = $event->id;

            $events_to_me = $this->m_event->gets_to_me($this->site->id, $this->user_data->id);
            if($events_to_me) foreach($events_to_me as $event) $event_ids[$event->id] = $event->id;

            $rsvp_users = array();
            $rsvp_user_ids = array();

            $result = $this->m_event->gets_rsvp(array_keys($event_ids));
            if($result) {
                foreach($result as $item) {
                    if(!isset($rsvp_users[$item->event_id])) {
                        $rsvp_users[$item->event_id] = array();
                        $rsvp_user_ids[$item->event_id] = array();
                    }
                    $rsvp_users[$item->event_id][] = $item;
                    $rsvp_user_ids[$item->event_id][] = $item->user_id;
                }
            }

            $this->set('rsvp_users', $rsvp_users);
            $this->set('rsvp_user_ids', $rsvp_user_ids);

            $this->set('events_by_me', $events_by_me);
            $this->set('events_to_me', $events_to_me);

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

    function user($user_id)
    {
        if(!empty($user_id))
        {
            $this->load->model('m_user');

            $user = $this->m_user->get($user_id);
            print_r($user);
        }
    }

    function welcome() // 첫 로그인 시에 ..
    {

    }

    function explore() // 탐색
    {
        $this->load->model('m_event');

        $event_ids = array();
        
        $count = $this->m_event->get_count($this->site->id);

        $max_event_time = 0;
        $min_event_time = 0;

        $event_get_count = 30;

        $events = $this->m_event->gets($this->site->id, $event_get_count);
        if(count($events)) {
            $max_event_time = strtotime($events[0]->rsvp_start_time);

            foreach($events as $key=>$event) {
                $event_ids[] = $event->id;
                $events[$key] = $this->__default($event);
            }
        }

        $this->set('events', $events);
        $this->set('have_more_events', $count > count($events));
        $this->set('max_event_time',$max_event_time);
        $this->set('event_get_count', $event_get_count);

        $rsvp_users = array();
        $rsvp_user_ids = array();
        $result = $this->m_event->gets_rsvp($event_ids);
        if($result) {
            foreach($result as $item) {
                if(!isset($rsvp_users[$item->event_id])) {
                    $rsvp_users[$item->event_id] = array();
                    $rsvp_user_ids[$item->event_id] = array();
                }
                $rsvp_users[$item->event_id][] = $item;
                $rsvp_user_ids[$item->event_id][] = $item->user_id;
            }
        }

        $this->set('rsvp_users', $rsvp_users);
        $this->set('rsvp_user_ids', $rsvp_user_ids);

        $this->view('page/explore');
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
                    $data->id = $event_id;                        

                    $this->load->model('m_history');
                    $this->m_history->add($event_id, $this->user_data->id, 'EVENT_CREATE', array('%1님이 "%2" 모임를 만들었습니다.', array($this->user_data->id, $data->title)));

                    $this->__auto_redirect($data);
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

        require_once(APPPATH . '/vendors/markdown' . EXT);

        if(is_numeric($url)) {
            $event = $this->m_event->get($url);
        } else {
             $event = $this->m_event->get_by_url($this->site->id, $url);
        }

        if($event) {
            $event = $this->__default($event);
            $this->set('event', $event);

            $rsvps =$this->m_event->gets_rsvp($event->id);
            $this->set('rsvps', $rsvps);

            $me_rsvp_in = false;
            foreach($rsvps as $rsvp) {
                if($rsvp->user_id == $this->user_data->id) {
                    $me_rsvp_in = true;
                    break;
                }
            }
            $this->set('me_rsvp_in',$me_rsvp_in);

            $this->view('page/event_view');
        } else {
            // wrong event
            redirect('/');
        }
    }

    public function event_rsvp($id)
    {
        if(!$this->user_data->id) redirect('/');

        $this->load->model('m_event');
        $this->load->model('m_history');
        
        $event = $this->m_event->get($id);
        if($event && $event->user_id == $this->user_data->id) {   
            $event = $this->__default($event);

            $this->set('event', $event);

            $rsvp_users = $this->m_event->gets_rsvp($event->id);
            $this->set('rsvp_users', $rsvp_users);

            $this->view('page/event_rsvp');
        } else {
            redirect('/');
        }
    }

    public function event_in($id)
    {
        if(!$this->user_data->id) redirect('/');

        $this->load->model('m_event');
        $this->load->model('m_history');

        $event = $this->m_event->get($id);
        if($event && $event->action == 'normal') {
            if($_POST && !empty($_POST)) {
                if($this->m_event->check_in($id, $this->user_data->id)) { // 이미 참석함
                    $this->__auto_redirect($event);
                } else if($event->rsvp_max == $event->rsvp_now) { // 정원이 가득참
                    $this->__auto_redirect($event);
                } else {
                    $errors = array();

                    if($data = $this->__in($event, $_POST, $errors)) {
                        $this->m_event->rsvp_in($data);
                        $this->m_event->event_increment_count($event->id, 'rsvp_now');

                        $this->m_history->add($event->id, $this->user_data->id, 'RSVP_IN', array('%1님이 "%2" 이벤트에 참석합니다.', array($this->user_data->id, $event->id)));

                        $this->__auto_redirect($event);
                    }
                    
                    $this->set('event', $event);

                    $this->set('errors', $errors);
                    $this->set('defaults', $_POST);

                    $this->view('page/event_in');
                } 
            } else {
                $error_message = '';
                if($this->m_event->check_in($id, $this->user_data->id)) { // 이미 참석함
                    $error_message = '이미 참석하셨습니다.';
                } else if($event->rsvp_max == $event->rsvp_now) { // 정원이 가득참
                    $error_message = '정원이 찼습니다.';
                } 

                $this->set('event', $event);

                if(empty($error_message)) {
                    $this->view('page/event_in');
                } else {
                    $this->set('error_message', $error_message);
                    $this->view('page/error');
                }
            }
        } else {
            redirect('/');
        }
    }

    public function event_out($id)
    {
        if(!$this->user_data->id) redirect('/');

        $this->load->model('m_event');
        $this->load->model('m_history');

        $event = $this->m_event->get($id);
        if($event) {
            if(!$this->m_event->check_in($id, $this->user_data->id)) { // 참석하지 않은 상태
                $this->__auto_redirect($event);
            } else {
                $this->m_event->rsvp_out($event->id, $this->user_data->id);
                $this->m_event->event_decrement_count($event->id, 'rsvp_now');

                $this->m_history->add($event->id, $this->user_data->id, 'RSVP_OUT', array('%1님이 "%2" 이벤트에서 참석 취소하셨습니다.', array($this->user_data->id, $event->title)));

                $this->__auto_redirect($event);
            }
        } else {
            redirect('/');
        }
    }

    public function event_edit($id)
    {
        if(!$this->user_data->id) redirect('/');

        $this->load->model('m_event');
        $this->load->model('m_history');

        $now = mktime();

        $event = $this->m_event->get($id);
        if($event && $event->user_id == $this->user_data->id && $event->action == 'normal' && strtotime($event->rsvp_start_time) > $now) {
            $errors = array();
            if($_POST && !empty($_POST)) {
                $_POST['rsvp_now'] = $event->rsvp_now;
                $data = $this->__create($_POST, $errors, false);

                foreach((array)$data as $key=>$value) {
                    $event->{$key} = $value;
                }     

                if(empty($errors)) {
                    $this->m_event->update($event->id, $data);              

                    $this->load->model('m_history');
                    $this->m_history->add($event->id, $this->user_data->id, 'EVENT_CREATE', array('%1님이 "%2" 모임을 수정했습니다.', array($this->user_data->id, $event->title)));

                    $this->__auto_redirect($event);
                }
                
            }

            $defaults = array();
            $defaults['set_rsvp_end'] = !empty($event->rsvp_end_time) && $event->rsvp_end_time != '0000-00 00:00:00';

            $defaults['title'] = $event->title;

            $start_date = strtotime($event->rsvp_start_time);
            $defaults['rsvp_start_date'] = date('Y-m-d', $start_date);
            if($event->rsvp_set_start_time == 'yes')
                $defaults['rsvp_start_time'] = date('h:i A', $start_date);

            if($defaults['set_rsvp_end']) {
                $end_date = strtotime($event->rsvp_end_time);
                $defaults['rsvp_end_date'] = date('Y-m-d', $end_date);
                if($event->rsvp_set_end_time == 'yes')
                    $defaults['rsvp_end_time'] = date('h:i A', $end_date);
            }

            $defaults['rsvp_now'] = $event->rsvp_now;
            $defaults['rsvp_max'] = $event->rsvp_max;

            $defaults['description'] = $event->description;

            $defaults['opt_enable_private_join'] = $event->opt_enable_private_join == 'yes' ? 'on' : 'off';
            $defaults['opt_add_input_contact'] = $event->opt_add_input_contact == 'yes' ? 'on' : 'off';

            $defaults['url'] = $event->url;

            $this->set('mode','edit');
            $this->set('defaults', $defaults);
            $this->set('errors', $errors);

            $this->set('event', $event);

            if(!empty($event->url)) {
                $permalink = site_url('/',$event->url);
            } else {
                $permalink = site_url('/'.$event->id);
            }
            $this->set('permalink', $permalink);

            $this->view('page/create');
        } else {
            redirect('/');
        }
    }

    public function event_cancel($id)
    {        
        if(!$this->user_data->id) redirect('/');

        $this->load->model('m_event');
        $this->load->model('m_history');

        $now = mktime();

        $event = $this->m_event->get($id);
        if($event && $event->user_id == $this->user_data->id && $event->action == 'normal') {
            if($event->rsvp_now == 0) { // 참석자가 없으면 삭제 ...
                $this->m_event->delete($event->id);
                $this->m_history->add($event->id, $this->user_data->id, 'EVENT_DELETE', array('%1님이 "%2" 모임을 삭제했습니다.', array($this->user_data->id, $event->title)));

                $this->set_notice_message('모임을 삭제했습니다.');

                redirect('/');
            } else { // 취소
                $this->m_event->cancel($event->id);
                $this->m_history->add($event->id, $this->user_data->id, 'EVENT_CANCEL', array('%1님이 "%2" 모임을 취소했습니다.', array($this->user_data->id, $event->title)));

                $this->set_notice_message('모임을 취소했습니다.');

                $this->__auto_redirect($event);
            }
        } else {
            redirect('/');
        }
    }

    public function event_finish($id)
    {        
        if(!$this->user_data->id) redirect('/');

        $this->load->model('m_event');
        $this->load->model('m_history');

        $now = mktime();

        $event = $this->m_event->get($id);
        if($event && $event->user_id == $this->user_data->id && in_array($event->action, array('normal','pause'))) {
            $this->m_event->finish($event->id);
            $this->m_history->add($event->id, $this->user_data->id, 'EVENT_FINISH', array('%1님이 "%2" 모임의 모집을 마감했습니다.', array($this->user_data->id, $event->title)));

            $this->set_notice_message('모임의 모집을 마감했습니다.');
            $this->__auto_redirect($event);
        } else {
            redirect('/');
        }
    }

    public function event_resume($id)
    {        
        if(!$this->user_data->id) redirect('/');

        $this->load->model('m_event');
        $this->load->model('m_history');

        $now = mktime();

        $event = $this->m_event->get($id);
        if($event && $event->user_id == $this->user_data->id && $event->action == 'pause') {
            $this->m_event->resume($event->id);
            $this->m_history->add($event->id, $this->user_data->id, 'EVENT_RESUME', array('%1님이 "%2" 모임의 모집을 다시 시작했습니다.', array($this->user_data->id, $event->title)));

            $this->set_notice_message('모임의 모집을 다시 시작했습니다.');
            $this->__auto_redirect($event);
        } else {
            redirect('/');
        }
    }

    public function event_pause($id)
    {        
        if(!$this->user_data->id) redirect('/');

        $this->load->model('m_event');
        $this->load->model('m_history');

        $now = mktime();

        $event = $this->m_event->get($id);
        if($event && $event->user_id == $this->user_data->id && $event->action == 'normal') {
            $this->m_event->pause($event->id);
            $this->m_history->add($event->id, $this->user_data->id, 'EVENT_PAUSE', array('%1님이 "%2" 모임의 모집을 잠시 멈췄습니다.', array($this->user_data->id, $event->title)));

            $this->set_notice_message('모임의 모집을 잠시 멈췄습니다.');
            $this->__auto_redirect($event);
        } else {
            redirect('/');
        }
    }

    private function __in($event, $form, &$errors)
    {
        $data = new StdClass;

        /// ---- 필수 ----
        // contact
        if($event->opt_add_input_contact=='yes') {
            if(!isset($form['contact']) || empty($form['contact'])) {
               $errors['contact'] = '연락처를 입력해주세요.';
               return false;
            } else { $data->contact = $form['contact']; }
        }

        // private_name
        if($event->opt_enable_private_join=='yes') {
            if((isset($form['enable_private_join']) && $form['enable_private_join'] == 'on')) {
                if((isset($form['private_name']) && !empty($form['private_name']))) {
                    $data->is_private = 'yes';
                    $data->user_name = $form['private_name']; 
                } else {
                    $errors['private_name'] = '익명을 입력해주세요.';
                    return false;
                }
            }
        } else {
            $data->is_private = 'no';
            $data->user_name = $this->user_data->display_name;
        }

        /// ---- 기본 ----
        $data->event_id = $event->id;
        $data->user_id = $this->user_data->id;       

        /// ---- 선택 ----
        $data->message = isset($form['message']) ? $form['message'] : '';
 

        return $data;
    }

    private function __create($form, &$errors, $return_false = true)
    {
        $data = new StdClass;

        /// ---- 필수 ----
        // 제목
        if(!isset($form['title']) || empty($form['title'])) {
           $errors['title'] = '제목을 입력해주세요.';
           if($return_false) return false;
        } 
        $data->title = $form['title'];

        $min = date('Y-m-d', mktime());
        $min_full = date('Y-m-d H:i:s', mktime());

         // 모임날짜
        if(!isset($form['rsvp_start_date']) || empty($form['rsvp_start_date'])) {
           $errors['rsvp_start_date'] = '날짜가 비어있습니다.';
           if($return_false) return false;
        }

        $rsvp_start_date = $form['rsvp_start_date'];
        if(strtotime($rsvp_start_date) < strtotime($min)) {
            $errors['rsvp_start_date'] = '지정한 날짜 [' . $rsvp_start_date . ']에 모임을 만들 수 없습니다.';
            return false;
        }

        if(!empty($form['rsvp_start_time'])) {
            $rsvp_start_time = date('H:i:s', strtotime($form['rsvp_start_time']));
            if(strtotime($rsvp_start_date . ' ' . $rsvp_start_time) < strtotime($min_full)) {
            $errors['rsvp_start_date'] = '지정한 날짜 [' . $rsvp_start_date . ' ' . $rsvp_start_time . ']에 모임을 만들 수 없습니다.';
            return false;
            }

            $data->rsvp_start_time = $rsvp_start_date . ' ' . $rsvp_start_time;
            $data->rsvp_set_start_time = 'yes';
        } else {
            $data->rsvp_start_time = $rsvp_start_date . ' ' . '00:00:00';
            $data->rsvp_set_start_time = 'no';
        }     

        // 모임 종료 날짜
        if(isset($form['set_rsvp_end']) && $form['set_rsvp_end'] == 'true' && isset($form['rsvp_end_date']) && !empty($form['rsvp_end_date'])) {
            $rsvp_end_date = $form['rsvp_end_date'];
            if(strtotime($rsvp_end_date) < strtotime($rsvp_start_date)) {
                $errors['rsvp_end_date'] = '종료 날짜는 시작 날짜 이후여야 합니다.';
                if($return_false) return false;
            }

            if(!empty($form['rsvp_end_time'])) {
                $rsvp_end_time = $form['rsvp_end_time'];
                if(strtotime($rsvp_end_date . ' ' . $rsvp_end_time) < strtotime($data->rsvp_start_time)) {
                    $errors['rsvp_end_date'] = '지정한 종료 날짜 [' . $rsvp_end_date . ' ' . $rsvp_end_time . ']에 모임을 만들 수 없습니다.';
                    if($return_false) return false;
                }

                $data->rsvp_end_time = $rsvp_end_date . ' ' . $rsvp_end_time;
                $data->rsvp_set_end_time = 'yes';
            } else {
                $data->rsvp_end_time = $rsvp_end_date . ' ' . '00:00:00';
                $data->rsvp_set_end_time = 'no';
            }
        }


        // 정원
        if(!isset($form['rsvp_max']) || empty($form['rsvp_max'])) {
           $errors['rsvp_max'] = '정원이 비어있습니다.';
           if($return_false) return false;
        }

        $data->rsvp_max = $form['rsvp_max'];
        if(!is_numeric($data->rsvp_max)) {
            $errors['rsvp_max'] = '정원값은 숫자여야 합니다.';
            if($return_false) return false;
        }

        if(!($data->rsvp_max > 0 && $data->rsvp_max <= 10)) {
            $errors['rsvp_max'] = '정원은 범위는 1~10명까지입니다.';
            if($return_false) return false;
        }

        if(isset($form['rsvp_now'])) {
            if($form['rsvp_now'] > $form['rsvp_max']) {
                $errors['rsvp_max'] = '정원이 현재 모집된 인원 ' . $form['rsvp_now'] . '명 보다 작아질 수 없습니다.';
                if($return_false) return false;
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
                if($return_false) return false;
            }

            if(empty($errors['url']) && strlen($url) <= 5) {
                $errors['url'] = '주소는 최소 6자 이상이 되어야 합니다.';
                if($return_false) return false;
            }

            if(empty($errors['url']) && in_array($url, array('join','signin','signout','login','logout','admin','owner','official','create','delete','welcome','search','find','explore','register','community','forum'))) {
                $errors['url'] = '사용하실 수 없는 주소입니다.';
                if($return_false) return false;
            }

            if(empty($errors['url']) && preg_match('/([a-zA-Z0-9\.]+)/', $url, $matches)) {
                $check_url = $matches[0];

                if(strcmp($check_url,$url) != 0) {
                    $errors['url'] = '주소는 알파벳과 숫자 그리고 점(.)만으로 이루어져야 합니다.';
                    if($return_false) return false;
                }
            }

            if(!$this->m_event->check_url_exists($this->site->id, $url)) {
                $data->url = $url;
            } else {
                $errors['url'] = '이미 사용중인 주소입니다.';
                if($return_false) return false;
            }
        }

        return $data;
    }

    private function __auto_redirect($event) {
        if(isset($event->url) && !empty($event->url)) {
            redirect('/' . $event->url);
        }

        redirect('/' . $event->id);
    }

    private function __default($event) {
        require_once(APPPATH . '/vendors/markdown' . EXT);

        if(!empty($event->url)) {
            $event->permalink = site_url('/',$event->url);
        } else {
            $event->permalink = site_url('/'.$event->id);
        }

        $event->rsvp_percent = round($event->rsvp_now / $event->rsvp_max * 100);
        $event->description = trim(Markdown(nl2br($event->description)));

        if(strtotime($event->rsvp_start_time) <= mktime()) {
            $event->is_end = true;
        } else {
            $event->is_end = false;
        }

        return $event;
    }
}
?>