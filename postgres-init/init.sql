-- Создание базы данных
CREATE DATABASE somedb;

-- Создание дополнительного пользователя (если нужно)
CREATE USER pguser WITH PASSWORD 'password';

-- Выдача прав на базу данных
GRANT ALL PRIVILEGES ON DATABASE somedb TO pguser;

\c somedb;


-- Создание таблицы (исправлен синтаксис)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Выдача прав на таблицу
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO pguser;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO pguser;

-- Установка владельца базы данных
ALTER DATABASE somedb OWNER TO pguser;
