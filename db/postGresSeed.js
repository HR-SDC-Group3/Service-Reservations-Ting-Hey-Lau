const fs = require('fs');
const { Pool, Client } = require('pg');
const db = require('./postGres');
const path = require('path');
const promise = require('bluebird');

const rStream = fs.createReadStream(path.join(__dirname + '/data.csv'),{encoding:'utf8'});
let buffer = '';

rStream.on('data', (chunk) => {
	buffer += chunk.toString();
	processEntry();
})

rStream.on('end',() => console.log('finished writing'));

rStream.on('error', (error) => console.log(error));

const processEntry = () => {
	let position;

	while (buffer.indexOf('\n') >= 0 && !rStream.isPaused()) {
		position = buffer.indexOf('\n');
		if (position === 0) {
			buffer = buffer.slice('1');
			continue;
		}
		//console.log(JSON.parse(buffer.slice(0,position)));
		saveEntry(JSON.parse(buffer.slice(0,position)));
		buffer = buffer.slice(position + 1);
	}
}

const saveEntry = (data) => {
	if (data) {
		rStream.pause();
		db.addRestaurant(data.name).then(() => {
			for (let i = 0; i < data.reservations.length; i++) {
				db.addReservation(data.id + 1, data.reservations[i].dateToReserve, data.reservations[i].timeToReserve, data.reservations[i].partySize);
			}
			rStream.resume();
		});
	}
}