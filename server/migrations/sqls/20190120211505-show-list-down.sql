ALTER TABLE `user_show`
  DROP FOREIGN KEY `user_show_parent_list`,
  DROP KEY `user_show_parent_list`

ALTER TABLE `user_show`
  DROP COLUMN `list_id`;

DROP TABLE `show_list`;
