<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class m_event extends CI_Model
{
    //----------------------- PUBLIC METHODS --------------------------//

    //----------------------- STATIC METHODS --------------------------//
    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    //----------------------- PUBLIC METHODS --------------------------//

    function check_url_exists($site_id, $url)
    {
    	if($this->db->from('events')->where('site_id',$site_id)->where('url', $url)->get()->row()) {
    		return true;
    	} else {
    		return false;
    	}
    }

    function create($data) {
    	if($this->db->insert('events', $data)) {
    		return $this->db->insert_id();
    	}

    	return false;
    }
}