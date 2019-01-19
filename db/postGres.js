const { Pool } = require('pg');
const redis = require('redis');
const Rclient = redis.createClient();
const AWS = require('aws-sdk');

Rclient.on('error', (err) => {
	console.log('Error ' + err);
});

const getReservations = (restaurantID, dateToReserve) => {
	return new Promise((resolve, reject) => {
		Rclient.get(`${restaurantID.toString() + dateToReserve}`, (err, res) => {
			if (err) {
				console.log(err);
				reject(err);
			} else if (!res) {
				resolve(getReservations2(restaurantID, dateToReserve));
			} else	{
				res = JSON.parse(res);
				getReservations2(restaurantID, dateToReserve);
				resolve(res);
			}
		})
	})
};

const client = new Pool({
	user: 'postgres',
	host: 'ec2-13-57-212-164.us-west-1.compute.amazonaws.com',
	database: 'opentablereservations',
	password: 'admin',
	port: 5432,
	ssl: true,
})

client.connect((err) => {
	if (err) {
		console.error(err.stack);
	} else {
		console.log('connected');
	}
})

const addRestaurant = (restaurantID, restaurantName) => {
	return new Promise((resolve, reject) => {
		client.query(`INSERT INTO restaurants (id, restaurantname) VALUES ('${restaurantID}', '${restaurantName}'); `, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		})
	})
};

const getReservations2 = (restaurantID, dateToReserve) => {
	return new Promise((resolve, reject) => {
		client.query(`SELECT * FROM reservations WHERE restaurantid=${restaurantID} AND datetoreserve='${dateToReserve}';`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				let rows = JSON.stringify(res.rows);
				Rclient.set(`${restaurantID.toString() + dateToReserve}`, rows);
				resolve(res.rows);
			}
		})
	})
};

const addReservation = (restaurantID, dateToReserve, timeToReserve, partySize) => {
	return new Promise((resolve, reject) => {
		client.query(`INSERT INTO reservations (restaurantid, datetoreserve, timetoreserve, partysize) VALUES ('${restaurantID}', '${dateToReserve}', '${timeToReserve}', '${partySize}'); `, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		})
	})
};

const deleteReservation = (reservationID) => {
	return new Promise((resolve, reject) => {
		client.query(`DELETE FROM reservations WHERE reservation.id = ${reservationID};`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		})
	})
};

const updateReservation = (reservationID, dateToReserve, timeToReserve, partySize) => {
	return new Promise((resolve, reject) => {
		client.query(`UPDATE reservations SET datetoreserve='${dateToReserve}', timetoreserve='${timeToReserve}', partysize='${partySize}' WHERE id=${reservationID};`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		})
	})
};


module.exports = {
	updateReservation,
	deleteReservation,
	addReservation,
	addRestaurant,
	getReservations,
	client
}