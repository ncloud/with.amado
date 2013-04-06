CREATE TABLE `events` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `site_id` int(11) unsigned DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `place` varchar(255) DEFAULT NULL,
  `url` varchar(64) DEFAULT NULL,
  `opt_enable_private_join` enum('yes','no') DEFAULT 'yes',
  `opt_add_input_contact` enum('yes','no') DEFAULT 'no',
  `opt_enable_waiting` enum('yes','no') DEFAULT 'no',
  `rsvp_now` int(11) unsigned DEFAULT '0',
  `rsvp_max` int(11) unsigned DEFAULT '0',
  `rsvp_waiting` int(11) unsigned DEFAULT '0',
  `rsvp_button_text` varchar(32) DEFAULT NULL,
  `rsvp_before_text` text,
  `rsvp_after_text` text,
  `rsvp_start_time` datetime DEFAULT NULL,
  `rsvp_set_start_time` enum('yes','no') DEFAULT 'no',
  `rsvp_end_time` datetime DEFAULT NULL,
  `rsvp_set_end_time` enum('yes','no') DEFAULT 'no',
  `action` enum('normal','cancel','pause','finish') DEFAULT 'normal',
  `action_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_id` (`site_id`,`url`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `role_users` (
  `user_id` bigint(20) unsigned NOT NULL,
  `role_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `roles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `roles` (`id`, `name`, `description`) VALUES 
  (1, "login", "로그인한 사용자입니다."), 
  (2, "guest", "로그인하지 않은 방문자입니다."), 
  (3, "admin", "관리자입니다. 관리자는 모든 권한을 다 가지고 있습니다.");

CREATE TABLE `sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `sites` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `host` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `domain` (`host`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `user_tokens` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `vendor_id` int(11) NOT NULL DEFAULT '0',
  `token` varchar(128) NOT NULL,
  `secret` varchar(128) DEFAULT NULL,
  `user_agent` varchar(200) DEFAULT NULL,
  `expires` int(11) NOT NULL,
  `can_use` enum('no','yes') DEFAULT 'yes',
  `created` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`vendor_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) DEFAULT NULL,
  `vendor_user_id` varchar(32) DEFAULT NULL,
  `profile` varchar(200) DEFAULT NULL,
  `username` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `random_password` varchar(100) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL DEFAULT '',
  `link` varchar(255) DEFAULT NULL,
  `language` varchar(2) DEFAULT 'en',
  `email` varchar(128) DEFAULT NULL,
  `activation_key` varchar(100) NOT NULL,
  `is_verified` enum('yes','no') DEFAULT 'no',
  `login_count` int(11) unsigned NOT NULL DEFAULT '0',
  `last_login_time` datetime NOT NULL,
  `last_ip_address` varchar(100) NOT NULL DEFAULT '',
  `last_user_agent` varchar(200) NOT NULL DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modify_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `vendor_id` (`vendor_id`,`vendor_user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `rsvps` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int(11) unsigned DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `user_name` varchar(64) DEFAULT NULL,
  `is_private` enum('yes','no') DEFAULT 'no',
  `is_waiting` enum('yes','no') DEFAULT 'no',
  `contact` varchar(32) DEFAULT NULL,
  `message` text,
  `insert_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `event_id` (`event_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `histories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int(11) unsigned DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  `message` text,
  `insert_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
