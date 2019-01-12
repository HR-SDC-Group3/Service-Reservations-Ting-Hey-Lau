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

COPY restaurants(_id, restaurantName) FROM 'C:/Users/michael Lau/Service-Mike/db/restaurants.csv' (FORMAT CSV, HEADER);

COPY reservations(restaurantID, dateToReserve, timeToReserve, partySize) FROM 'C:/Users/michael Lau/Service-Mike/db/reservations.csv' (FORMAT CSV, HEADER);

/* run psql -U YOUR_USER_NAME -W < db/postGresSchema.sql
from the root directory and enter your password for the prompts 
change lines 20, 22 to absolute paths for respective restaurant and reservation csv raw data files*/