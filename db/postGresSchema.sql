DROP DATABASE IF EXISTS opentablereservations;

CREATE DATABASE opentablereservations;

\c opentablereservations;

CREATE TABLE IF NOT EXISTS restaurants (
  id SERIAL UNIQUE PRIMARY KEY,
  restaurantName text NOT NULL
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL UNIQUE PRIMARY KEY,
  restaurantID INTEGER REFERENCES restaurants(id),
  dateToReserve varchar(6) NOT NULL,
  timeToReserve varchar(4) NOT NULL,
  partySize varchar(2) NOT NULL
);

/* run psql -U YOUR_USER_NAME -W < db/postGresSchema.sql
from the root directory and enter your password for the prompts */