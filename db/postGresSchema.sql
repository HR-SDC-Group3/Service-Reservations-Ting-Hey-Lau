DROP DATABASE IF EXISTS openTableReservations;

CREATE DATABASE openTableReservations;

USE openTableReservations;

/* Create other tables and define schemas for them here! */

CREATE TABLE restaurants (
  id SERIAL UNIQUE PRIMARY KEY,
  restaurantName varchar(40) NOT NULL,

);

CREATE TABLE reservations (
  id SERIAL UNIQUE PRIMARY KEY,
  restaurantID INTEGER REFERENCES restaurants(id),
  dateToReserve varchar(6) NOT NULL,
  timeToReserve varchar(4) NOT NULL,
  partySize varchar(2) NOT NULL,
);