<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class M_History extends CI_Model
{
    //----------------------- PUBLIC METHODS --------------------------//

    //----------------------- STATIC METHODS --------------------------//
    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    //----------------------- PUBLIC METHODS --------------------------//

    function add($event_id, $user_id, $type, $message) {
    	$data = new StdClass;
    	$data->event_id = $event_id;
    	$data->user_id = $user_id;
    	$data->type = $type;
    	if(is_array($message)) {
    		$data->message = json_encode($message);
    	} else {
    		$data->message = $message;
    	}

    	$data->insert_time = date('Y-m-d H:i:s', mktime());

    	return $this->db->insert('histories', $data);
    }
}