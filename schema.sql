CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,
  ciphertext BYTEA NOT NULL,
  nonce BYTEA NOT NULL,
  salt BYTEA NOT NULL,
  hash BYTEA NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_messages_user_session ON messages(user_id, session_id);
CREATE INDEX idx_messages_timestamp ON messages(timestamp);

-- User legal agreement tracking (for compliance)
CREATE TABLE user_agreements (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agreement_type VARCHAR(50) NOT NULL, -- 'diagnostic_disclaimer', 'terms_of_service', etc.
  accepted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_user_agreements_user_type ON user_agreements(user_id, agreement_type);
CREATE INDEX idx_user_agreements_timestamp ON user_agreements(accepted_at);
