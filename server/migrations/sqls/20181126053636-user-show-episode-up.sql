CREATE TABLE `user_show_episode` (
  `user_id` int(11) unsigned NOT NULL,
  `show_id` int(11) unsigned NOT NULL,
  `episode_id` int(11) NOT NULL,
  `season_number` int(11) NOT NULL,
  `episode_number` int(11) NOT NULL,
  `datetime_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`show_id`,`episode_id`),
  CONSTRAINT `user_show_episode_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
