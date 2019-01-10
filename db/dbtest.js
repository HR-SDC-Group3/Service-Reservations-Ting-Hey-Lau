const fs = require('fs');
const { Pool, Client } = require('pg');
const db = require('./postGres');
const path = require('path');
const promise = require('bluebird');

db.client.query(`INSERT INTO restaurants (restaurantname) VALUES ('omegalul'); `,(err, data) => {
	console.log(data, err);
	db.client.end();
});