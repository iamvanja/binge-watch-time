CREATE TABLE "user" (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL DEFAULT '',
  last_name VARCHAR(30) NOT NULL DEFAULT '',
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  verification_code VARCHAR(50) NOT NULL DEFAULT '',
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  datetime_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datetime_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- To emulate the "ON UPDATE CURRENT_TIMESTAMP" behavior:
CREATE OR REPLACE FUNCTION update_datetime_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.datetime_updated = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_datetime_updated
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION update_datetime_updated();
