CREATE TABLE `show_list` (
  `list_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `show_list` (`list_id`, `name`)
VALUES
  (1, 'To-do'),
  (2, 'Watching'),
  (3, 'Watched');

ALTER TABLE `user_show`
  ADD COLUMN `list_id` int(11) unsigned NOT NULL;

UPDATE `user_show` SET `list_id` = 2;

ALTER TABLE `user_show`
  ADD KEY `user_show_parent_list` (`list_id`),
  ADD CONSTRAINT `user_show_parent_list`
  FOREIGN KEY (`list_id`)
  REFERENCES `show_list` (`list_id`)
  ON DELETE CASCADE;
