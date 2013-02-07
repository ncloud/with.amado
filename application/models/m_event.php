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

    function get($id) {
        return $this->db->from('events')->where('id', $id)->get()->row();        
    }

    function get_by_url($site_id, $url)
    {
        return $this->db->from('events')->where('site_id',$site_id)->where('url', $url)->get()->row();
    }

    function check_url_exists($site_id, $url)
    {
    	if($this->get_by_url($site_id, $url)) {
    		return true;
    	} else {
    		return false;
    	}
    }

    function gets_rsvp($event_id)
    {
        return $this->db->from('rsvps')->join('users', 'users.id = rsvps.user_id')->where('rsvps.event_id',$event_id)->select('rsvps.*, users.profile, users.username, users.display_name')->get()->result();
    }

    function create($data) {
    	if($this->db->insert('events', $data)) {
    		return $this->db->insert_id();
    	}

    	return false;
    }

    function rsvp_in($event_id, $user_id)
    {
        $data = new StdClass;
        $data->event_id = $event_id;
        $data->user_id = $user_id;
        $data->insert_time = date('Y-m-d H:i:s', mktime());

        return $this->db->insert('rsvps', $data);
    }

    function check_in($event_id, $user_id) {
        if($this->db->from('rsvps')->where(array('event_id'=>$event_id, 'user_id'=>$user_id))->get()->row()) {
            return true;
        } else {
            return false;
        }
    }

    public function event_increment_count($id, $field)
    {
        $this->db->set($field, $field . ' + 1', FALSE);
        $this->db->where('id', $id);
        $this->db->update('events');
    }

    public function event_decrement_count($id, $field)
    {
        $this->db->set($field, $field . ' - 1', FALSE);
        $this->db->where('id', $id);
        $this->db->update('events');
    }

}