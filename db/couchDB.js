const auth = require('./couchConfig.js');
const nano = require('nano')(`http://${auth.user}:${auth.pass}@localhost:5984`);

const opentablereservations = nano.use('opentablereservations');

const addRestaurant = (restaurantID, restaurantName, callback) => {
	opentablereservations.insert({
	id: restaurantID,
	restaurantname: restaurantName,
	reservations: [],
	}, (err, res) => {
		if (err) {
			callback(err);
		} else {
			callback(res);
		}
	});
};

const getReservations = (restaurantID, dateToReserve, callback) => {
	opentablereservations.find({
		selector: {
			id: {"$eq": restaurantID},
			reservations: {
				$elemMatch: {
					datetoreserve: {
						"$eq": dateToReserve.toString()
					}
				}
			}
    }
  }, (err, res) => {
  	if (err) {
  		callback(err);
  	} else {
  		callback(res.docs[0].reservations);	
  	}
  });
}

const addReservation = (restaurantID, dateToReserve, timeToReserve, partySize, callback) => {
	opentablereservations.find({selector:{
		id:{"$eq": restaurantID}
	}}, (err, res) => {
		if (err) {
			callback(err);
		} else {
			console.log(res);
			let copy = res.docs[0].reservations.slice(0);
			let entry = {
				datetoreserve: dateToReserve.toString(),
				timetoreserve: timeToReserve.toString(),
				partysize: partySize.toString()
			}
			copy.push(entry);
			opentablereservations.insert({
				_id: res.docs[0]._id.toString(),
				_rev: res.docs[0]._rev.toString(),
				id: restaurantID,
				restaurantname: res.docs[0].restaurantname,
				reservations: copy
			}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	});
};


const deleteReservation = (restaurantID, dateToReserve, timeToReserve, partySize, callback) => {
	opentablereservations.find({selector:{
		id:{"$eq": restaurantID}
	}}, (err, res) => {
		if (err) {
			callback(err);
		} else {
			let copy = res.docs[0].reservations.slice(0);
			for (let i = 0; i < res.docs[0].reservations.length; i++) {
				let item = res.docs[0].reservations[i];
				if (item.datetoreserve === dateToReserve && item.timetoreserve === timeToReserve && item.partysize === partySize) {
					copy.splice(i,1);
				}
			}
			opentablereservations.insert({
				_id: res.docs[0]._id.toString(),
				_rev: res.docs[0]._rev.toString(),
				id: restaurantID.toString(),
				restaurantname: res.docs[0].restaurantname,
				reservations: copy
			}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	});
};

const updateReservation = (restaurantID, dateToReserve, timeToReserve, partySize, newDateToReserve, newTimeToReserve, newPartySize, callback) => {
	opentablereservations.find({selector:{
		id:{"$eq": restaurantID}
	}}, (err, res) => {
		if (err) {
			callback(err);
		} else {
			let copy = res.docs[0].reservations.slice(0);
		  let entry = {
				datetoreserve: newDateToReserve.toString(),
				timetoreserve: newTimeToReserve.toString(),
				partysize: newPartySize.toString()
			}
			for (let i = 0; i < res.docs[0].reservations.length; i++) {
				let item = res.docs[0].reservations[i];
				if (item.datetoreserve === dateToReserve && item.timetoreserve === timeToReserve && item.partysize === partySize) {
					copy.splice(i,1,entry);
				}
			}
			opentablereservations.insert({
				_id: res.docs[0]._id.toString(),
				_rev: res.docs[0]._rev.toString(),
				id: restaurantID.toString(),
				restaurantname: res.docs[0].restaurantname,
				reservations: copy
			}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	});
};


module.exports = {
	updateReservation,
	deleteReservation,
	addReservation,
	addRestaurant,
	getReservations
}
