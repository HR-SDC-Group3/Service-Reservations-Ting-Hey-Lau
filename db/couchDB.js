const auth = require('./couchConfig.js');
const nano = require('nano')(`http://${auth.user}:${auth.pass}@localhost:5984`);
const Promise = require('bluebird');

const restaurants = nano.use('restaurants');
const reservations = nano.use('reservations')

const addRestaurant = (restaurantID, restaurantName) => {
	return restaurants.insert('opentablereservations', {
		id:restaurantID,
		restaurantname: restaurantName,
	});
};

const getReservations = (restaurantID, dateToReserve) => {
	return reservations.find({selector: {
		restaurantid: {"$eq": restaurantID},
		datetoreserve: {"$eq": dateToReserve}
    },
  limit:50
  });
};

const addReservation = (restaurantID, dateToReserve, timeToReserve, partySize) => {
  return reservations.insert({ 
  	restaurantid: restaurantID,
  	datetoreserve: dateToReserve,
  	timetoreserve: timeToReserve,
  	partysize: partySize
  });
};

const deleteReservation = (reservationID) => {
	return new Promise((resolve, reject) => {
		reservations.find({selector: {
			reservationid:{ "$eq": reservationID}
		}}).then(body => {
			reservations.destroy(body._id, body._rev, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		})
	});
};

const updateReservation = (reservationID, dateToReserve, timeToReserve, partySize) => {
	return new Promise((resolve, reject) => {
		reservations.find({selector: {
			_id: {"$eq": reservationID.toString()}
		}}).then(body => {
			reservations.insert({
				datetoreserve: dateToReserve,
				timetoreserve: timeToReserve,
				partysize: partySize
			}, reservationID.toString(), (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			})
		});
	})
};


module.exports = {
	updateReservation,
	deleteReservation,
	addReservation,
	addRestaurant,
	getReservations
}
