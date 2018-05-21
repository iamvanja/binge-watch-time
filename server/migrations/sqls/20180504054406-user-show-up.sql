CREATE TABLE `user_show` (
  `user_id` int(11) unsigned NOT NULL,
  `show_id` int(11) unsigned NOT NULL,
  `datetime_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`show_id`),
  CONSTRAINT `user_show_parent_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
