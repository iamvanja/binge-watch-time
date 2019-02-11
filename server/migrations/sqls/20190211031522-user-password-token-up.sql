CREATE TABLE `user_password_token` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `token` varchar(50) NOT NULL DEFAULT '',
  `is_used` tinyint(1) NOT NULL DEFAULT '0',
  `datetime_added` datetime DEFAULT CURRENT_TIMESTAMP,
  `datetime_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id_parent_user` (`user_id`),
  CONSTRAINT `user_id_parent_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
