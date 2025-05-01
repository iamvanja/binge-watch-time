CREATE TABLE user_show_episode (
  user_id INTEGER NOT NULL,
  show_id INTEGER NOT NULL,
  episode_id INTEGER NOT NULL,
  season_number INTEGER NOT NULL,
  episode_number INTEGER NOT NULL,
  datetime_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, show_id, episode_id),
  CONSTRAINT user_show_episode_ibfk_1
    FOREIGN KEY (user_id)
    REFERENCES "user" (user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
