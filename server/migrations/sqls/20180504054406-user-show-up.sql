CREATE TABLE user_show (
  user_id INTEGER NOT NULL,
  show_id INTEGER NOT NULL,
  datetime_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, show_id),
  CONSTRAINT user_show_parent_user
    FOREIGN KEY (user_id)
    REFERENCES "user" (user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
