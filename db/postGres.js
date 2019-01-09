const { Pool,Client } = require('pg');
const Promise = require('bluebird');

const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'openTableReservations',
	password: 'admin',
	port: 5432,
})

client.connect((err) => {
	if (err) {
		console.error(err.stack);
	} else {
		console.log('connected');
	}
})

const addRestaurant = (restaurantName) => {
	return new Promise((resolve, reject) => {
		client.query(`INSERT INTO restaurants(restaurantName) VALUES(${restaurantName})`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		})
	})
}

const getReservations = (restaurantID) => {
	return new Promise((resolve, reject) => {
		client.query(`SELECT * FROM reservations WHERE restaurantID=${restaurantID}`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		})
	})
}

const addReservation = (restaurantID, dateToReserve, timeToReserve, partySize) => {
	return new Promise((resolve, reject) => {
		client.query(`INSERT INTO reservations(restaurantID, dateToReserve, timeToReserve, partySize) VALUES(${restaurantID},${dateToReserve}, ${timeToReserve}, ${partySize})`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		})
	})
}

const deleteReservation = (partySize, dateToReserve, timeToReserve) => {
	return new Prmise((resolve, reject) => {
		client.query(`DELETE FROM reservations WHERE reservation.partySize = ${partySize} AND reservation.dateToReserve = ${dateToReserve} AND reservation.timeToReserve = ${timeToReserve}`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		})
	})
}

const updateReservation = (reservationID, dateToReserve, timeToReserve, partySize) => {
	return new Promise((resolve, reject) => {
		client.query(`UPDATE reservations SET dateToReserve=${dateToReserve}, timeToReserve=${timeToReserve}, partySize=${partySize} WHERE id=${reservationID}`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		})
	})
}


module.exports = {
	updateReservation,
	deleteReservation,
	addReservation,
	addRestaurant,
	getReservations,
	client
}