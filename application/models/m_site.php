<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class M_Site extends CI_Model
{
    //----------------------- PUBLIC METHODS --------------------------//

    //----------------------- STATIC METHODS --------------------------//
    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    //----------------------- PUBLIC METHODS --------------------------//
    function get_by_host($host) {
    	return $this->db->from('sites')->where('host', $host)->get()->row();
    }
}