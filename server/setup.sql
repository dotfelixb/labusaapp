-- LabUsa Database
CREATE DATABASE LabUsaApp;

CREATE TABLE User (
  id SERIAL PRIMARY KEY,
  fname varchar(150),
  lname varchar(150),
  username varchar(150),
  hashpassword varchar(max),
  createdby int default(1), 
  createdat timestamptz,
  updatedby int,
  updatedat timestamptz
);

CREATE TABLE User_log(
  id SERIAL PRIMARY KEY,
  target int references User(id), 
  actionname varchar(50),
  objectname varchar(50),
  objectdata jsonb,
  createdby int, 
  createdat timestamptz,
);