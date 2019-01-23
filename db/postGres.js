const { Pool } = require('pg');
const redis = require('redis');
const Rclient = redis.createClient();

Rclient.on('error', (err) => {
	console.log('Error ' + err);
});

Rclient.on('connect', () => {
	console.log('connected to redis');
})

const getReservations = (restaurantID, dateToReserve) => {
	return new Promise((resolve, reject) => {
		Rclient.get(`${restaurantID.toString() + dateToReserve}`, (err, res) => {
			if (err) {
				console.log(err);
				reject(err);
			} else if (!res) {
				console.log('here');
				resolve(getReservations2(restaurantID, dateToReserve));
			} else	{
				res = JSON.parse(res);
				console.log('there');
				getReservations2(restaurantID, dateToReserve);
				resolve(res);
			}
		})
	})
};

const client = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'opentablereservations',
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
				Rclient.set(`${restaurantID.toString() + dateToReserve}`, rows, 'EX', 10);
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
				getReservations2(restaurantID, dateToReserve);
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
				client.query(`SELECT restaurantid FROM reservations where id=${reservationID}`, (err, res) => {
					getReservations2(res.rows[0], dateToReserve);
				})
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
				client.query(`SELECT restaurantid FROM reservations where id=${reservationID}`, (err, res) => {
					getReservations2(res.rows[0], dateToReserve);
				})
				resolve(res.rows);
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