<?php

class Ajax extends APP_Controller {
    function __construct() 
    {
        parent::__construct();
    }

    function more_events($max_time, $page, $count = 30)
    {
    	$this->load->model('m_event');

	    $output = new StdClass;
		$output->success = false;
    	$output->content = '';

    	if(!empty($max_time)) {		
    		$index = ($page-1) * $count + 1;
    		$count = $this->m_event->get_count($this->site->id);
    		$where = array('events.rsvp_start_time >='=>date('Y-m-d H:i:s', $max_time));
    		
	    	$events = $this->m_event->gets($this->site->id, $count, $index, $where);
	    	if($events && count($events)) {	    		
	    		$output->success = true;
	   		    $output->have_more = $index + count($events) < $count;
	    		$output->page = $page + 1;

	    		foreach($events as $event) {
	    			$output->content.= $this->view('slices/event_column_item', array('event'=>$event), true);
	    		}
	    	}
	    }

	    echo json_encode($output);
    }
}