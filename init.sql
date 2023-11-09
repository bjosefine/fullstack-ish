CREATE TABLE IF NOT EXISTS superheroes (
    id SERIAL PRIMARY KEY,
    "name" text UNIQUE NOT NULL,
    power text
);

INSERT INTO superheroes ("name", power)
VALUES ('Spider-Man', 'Web slinging');