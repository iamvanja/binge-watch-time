CREATE TABLE user_password_token (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  token VARCHAR(50) NOT NULL DEFAULT '',
  is_used BOOLEAN NOT NULL DEFAULT FALSE,
  datetime_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  datetime_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX user_id_parent_user ON user_password_token (user_id);

ALTER TABLE user_password_token
  ADD CONSTRAINT user_id_parent_user
  FOREIGN KEY (user_id)
  REFERENCES "user" (user_id)
  ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION update_user_password_token_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.datetime_updated = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_password_token_timestamp
BEFORE UPDATE ON user_password_token
FOR EACH ROW
EXECUTE FUNCTION update_user_password_token_timestamp();
