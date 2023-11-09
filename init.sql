CREATE TABLE IF NOT EXISTS superheroes (
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL,
    power text
)