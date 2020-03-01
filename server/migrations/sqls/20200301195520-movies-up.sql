CREATE TABLE `movie_list` (
  `list_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `movie_list` (`list_id`, `name`)
VALUES
  (1, 'To-do'),
  (2, 'Watched'),
  (3, 'Most Favorite');

CREATE TABLE `user_movie` (
  `user_id` int(11) unsigned NOT NULL,
  `movie_id` int(11) unsigned NOT NULL,
  `datetime_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `list_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`movie_id`),
  KEY `user_movie_parent_list` (`list_id`),
  CONSTRAINT `user_movie_parent_list` FOREIGN KEY (`list_id`) REFERENCES `movie_list` (`list_id`) ON DELETE CASCADE,
  CONSTRAINT `user_movie_parent_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
