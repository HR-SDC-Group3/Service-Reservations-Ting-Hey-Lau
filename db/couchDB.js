const NodeCouchDB = require('node-couchdb');
const Promise = require('bluebird');
const couch = require('./couchDBSeed.js');

const addRestaurant = (restaurantID, restaurantName) => {
	return new Promise((resolve, reject) => {
		couch.insert('opentablereservations', {
			_id:restaurantID,
			
		})
	})
};

const getReservations = (restaurantID, dateToReserve) => {
		couch.get("opentablereservations", `SELECT * FROM reservations WHERE restaurantid=${restaurantID} AND datetoreserve='${dateToReserve}';`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		})
};

const addReservation = (restaurantID, dateToReserve, timeToReserve, partySize) => {
	return new Promise((resolve, reject) => {
		couch.query(`INSERT INTO reservations (restaurantid, datetoreserve, timetoreserve, partysize) VALUES ('${restaurantID}', '${dateToReserve}', '${timeToReserve}', '${partySize}'); `, (err, res) => {
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
		couch.query(`DELETE FROM reservations WHERE reservation.id = ${reservationID};`, (err, res) => {
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
		couch.query(`UPDATE reservations SET datetoreserve='${dateToReserve}', timetoreserve='${timeToReserve}', partysize='${partySize}' WHERE id=${reservationID};`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		})
	})
};

