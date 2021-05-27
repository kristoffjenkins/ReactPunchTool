CREATE DATABASE TMS;

--user table--
--set extention
CREATE TABLE users(
    _id INTEGER PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    _password VARCHAR(255) NOT NULL,
    _role VARCHAR(50) NOT NULL
);

--punch table--
--set extention
CREATE TABLE punches(
    id SERIAL,
    id_user INTEGER NOT NULL,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    activity VARCHAR(100) NOT NULL,
    punch_date VARCHAR(100) NOT NULL,
    punch_time VARCHAR (20) NOT NULL
);


--schedule table--
--set extention
CREATE TABLE schedule(
    id SERIAL,
    id_creator INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    activity VARCHAR(100) NOT NULL,
    punch_date VARCHAR(100) NOT NULL,
    punch_time VARCHAR(100) NOT NULL
);