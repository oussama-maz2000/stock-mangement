CREATE TABLE roles(
                      id BIGSERIAL  PRIMARY KEY,
                      created_by BIGINT ,
                      name VARCHAR(60) NOT NULL UNIQUE,
                      created_at TIMESTAMP    NOT NULL DEFAULT NOW(),
                      updated_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE users(
id BIGSERIAL  PRIMARY KEY,
role_id BIGINT REFERENCES roles(id),
username VARCHAR(60) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
enabled BOOLEAN NOT NULL DEFAULT TRUE,
created_at TIMESTAMP    NOT NULL DEFAULT NOW(),
updated_at TIMESTAMP    NOT NULL DEFAULT NOW()
);
