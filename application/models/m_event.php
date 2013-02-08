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
        return $this->db->from('events')->join('users','users.id = events.user_id')->where('events.id', $id)->select('events.*, users.profile as user_profile, users.display_name as user_display_name')->get()->row();        
    }

    function get_by_url($site_id, $url)
    {        
        return $this->db->from('events')->join('users','users.id = events.user_id')->where('events.site_id',$site_id)->where('events.url', $url)->select('events.*, users.profile as user_profile, users.display_name as user_display_name')->get()->row();        
    }

    function gets_by_me($site_id, $user_id)
    {
        return $this->db->from('events')->where('events.site_id', $site_id)->where('events.user_id', $user_id)->order_by('events.create_time DESC')->select('events.*')->get()->result();
    }

    function gets_to_me($site_id, $user_id)
    {
        return $this->db->from('events')->join('rsvps','rsvps.event_id = events.id')->join('users','users.id = events.user_id')->where('events.site_id', $site_id)->where('rsvps.user_id', $user_id)->order_by('events.create_time DESC')->select('events.*, users.profile as user_profile, users.display_name as user_display_name')->get()->result();
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
        if(empty($event_id)) return false;

        $this->db->from('rsvps')->join('users', 'users.id = rsvps.user_id')->select('rsvps.*, users.profile, users.username');

        if(!is_array($event_id))
            $this->db->where('rsvps.event_id',$event_id);
        else
            $this->db->where_in('rsvps.event_id', $event_id);

        return $this->db->order_by('rsvps.insert_time DESC')->get()->result();
    }

    function create($data) {
        $data->create_time = date('Y-m-d H:i:s', mktime());

    	if($this->db->insert('events', $data)) {
    		return $this->db->insert_id();
    	}

    	return false;
    }

    function update($event_id, $data) {
        $data->update_time = date('Y-m-d H:i:s', mktime());

        $this->db->where('id', $event_id);
        return $this->db->update('events', $data);
    }

    function rsvp_in($event_id, $user_id = null)
    {
        if(is_object($event_id)) {
            $data = $event_id;
        } else {
            $data = new StdClass;
            $data->event_id = $event_id;
            $data->user_id = $user_id;
        }
        
        $data->insert_time = date('Y-m-d H:i:s', mktime());

        return $this->db->insert('rsvps', $data);
    }

    function rsvp_out($event_id, $user_id)
    {
        return $this->db->delete('rsvps', array('event_id' => $event_id, 'user_id'=>$user_id));
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