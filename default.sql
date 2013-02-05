/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50153
Source Host           : localhost:3306
Source Database       : catchr

Target Server Type    : MYSQL
Target Server Version : 50153
File Encoding         : 65001

Date: 2013-02-01 17:30:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `events`
-- ----------------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `place` varchar(255) DEFAULT NULL,
  `rsvp_now` int(11) unsigned DEFAULT NULL,
  `rsvp_max` int(11) DEFAULT NULL,
  `rsvp_button_text` varchar(32) DEFAULT NULL,
  `rsvp_before_text` text,
  `rsvp_after_text` text,
  `rsvp_start_time` datetime DEFAULT NULL,
  `rsvp_end_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of events
-- ----------------------------

-- ----------------------------
-- Table structure for `roles`
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', 'login', 'Login privileges, granted after account confirmation.');
INSERT INTO `roles` VALUES ('2', 'guest', 'Guest User who don\'t have a login account.');
INSERT INTO `roles` VALUES ('3', 'admin', 'Administrative user, has access to everything.');

-- ----------------------------
-- Table structure for `role_users`
-- ----------------------------
DROP TABLE IF EXISTS `role_users`;
CREATE TABLE `role_users` (
  `user_id` bigint(20) unsigned NOT NULL,
  `role_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_users
-- ----------------------------
INSERT INTO `role_users` VALUES ('1', '1');

-- ----------------------------
-- Table structure for `sessions`
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('05c8080a2d9a34b46767cd18c4b67d28', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/53', '1359700070', '');
INSERT INTO `sessions` VALUES ('21f8890d0eb32bb90ba9309fe5200fcd', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/53', '1359700203', '');
INSERT INTO `sessions` VALUES ('38f0e26930c4fe25848dc56c9b3c95f4', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/53', '1359707059', 'a:1:{s:9:\"auth_user\";O:8:\"stdClass\":21:{s:2:\"id\";s:1:\"1\";s:9:\"vendor_id\";s:1:\"1\";s:14:\"vendor_user_id\";s:15:\"100001956366863\";s:7:\"profile\";s:59:\"http://beta.com/catchr/img/content/icon_default_profile.png\";s:8:\"username\";s:24:\"facebook_100001956366863\";s:8:\"password\";s:48:\"bo83q7cj1434e00abe4ek8be95xeob9db23cdc6822154c56\";s:15:\"random_password\";s:32:\"dociqdxjsqvvewcbax4ikwi2wmxto5ox\";s:4:\"name\";s:12:\"그냥보통\";s:12:\"display_name\";s:12:\"그냥보통\";s:8:\"language\";s:2:\"en\";s:14:\"activation_key\";s:32:\"4emtcrbzovf2iv6y1kmdb0bpqutot7wj\";s:11:\"is_verified\";s:2:\"no\";s:11:\"login_count\";s:1:\"0\";s:15:\"last_login_time\";s:19:\"0000-00-00 00:00:00\";s:15:\"last_ip_address\";s:9:\"127.0.0.1\";s:15:\"last_user_agent\";s:108:\"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17\";s:11:\"create_time\";s:19:\"2013-02-01 13:45:24\";s:11:\"modify_time\";s:19:\"0000-00-00 00:00:00\";s:18:\"is_default_profile\";b:1;s:16:\"profile_original\";s:63:\"http://beta.com/catchr/img/content/icon_default_profile_big.png\";s:9:\"permalink\";s:29:\"http://beta.com/catchr/user/1\";}}');
INSERT INTO `sessions` VALUES ('82aa43c9278605ca2f85f572cd0b8853', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/53', '1359693922', '');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
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
  `language` varchar(2) DEFAULT 'en',
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '1', '100001956366863', '', 'facebook_100001956366863', 'bo83q7cj1434e00abe4ek8be95xeob9db23cdc6822154c56', 'dociqdxjsqvvewcbax4ikwi2wmxto5ox', '그냥보통', '그냥보통', 'en', '4emtcrbzovf2iv6y1kmdb0bpqutot7wj', 'no', '0', '0000-00-00 00:00:00', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17', '2013-02-01 13:45:24', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for `user_tokens`
-- ----------------------------
DROP TABLE IF EXISTS `user_tokens`;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_tokens
-- ----------------------------
INSERT INTO `user_tokens` VALUES ('1', '1', '1', 'AAABdA2AupzoBAFA7YIxHtdJGTFqPyxDV2JyKq2MarZArIn12Mya20vVxPPn96knIGW4mq8ZCWCldhmtyabg6DkIt5Gtf2DfoH58xDvAAZDZD', null, '3063e4f5b2f57b96c8836a71b0379b4c9430c709', '1360909857', 'yes', '1359700254');
