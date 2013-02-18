<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There is one reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
*/

$route['default_controller']                    	 = 'page';

 
/**
 * Login
 */
$route['login']								    = 'page/login';
$route['join']                                  = 'page/join';

$route['login/facebook']                        = 'user/login_facebook';
$route['logout']								= 'user/logout';

$route['login/do']                              = 'user/login';
$route['join/do']                               = 'user/join';

// First Login
$route['step/welcome']							= 'page/welcome';

$route['create']								= 'page/create';
$route['explore']								= 'page/explore';

$route['event/in/(:num)']						= 'page/event_in/$1';
$route['event/out/(:num)']						= 'page/event_out/$1';
$route['event/edit/(:num)']						= 'page/event_edit/$1';
$route['event/rsvp/(:num)']						= 'page/event_rsvp/$1';
$route['event/delete/(:num)']					= 'page/event_cancel/$1';
$route['event/cancel/(:num)']					= 'page/event_cancel/$1';
$route['event/finish/(:num)']					= 'page/event_finish/$1';
$route['event/pause/(:num)']					= 'page/event_pause/$1';
$route['event/resume/(:num)']					= 'page/event_resume/$1';

$route['(:any)']                             	= 'page/event/$1';

/* End of file routes.php */
/* Location: ./application/config/routes.php */