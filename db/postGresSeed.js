//redunant script

const fs = require('fs');
const { Pool, Client } = require('pg');
const db = require('./postGres');
const path = require('path');
const promise = require('bluebird');

const rRestStream = fs.createReadStream(path.join(__dirname + '/restaurants.csv'), {encoding: 'utf8'});
const rResStream = fs.createReadStream(path.join(__dirname + '/restaurants.csv'), {encoding: 'utf8'});
let bufferRest = '';
let bufferRes = ''

rRestStream.on('data', (chunk) => {
	bufferRest += chunk.toString()
	processEntry();
});

rRestStream.on('end',() => {
	console.log('finished writing all entries');
	db.client.end();
});

rRestStream.on('error', (error) => console.log(error));

const processEntry = () => {
	let position;

	while (bufferRest.indexOf('\n') >= 0 && !rRestStream.isPaused()) {
		position = bufferRest.indexOf('\n');
		if (position === 0) {
			bufferRest = bufferRest.slice('1');
			continue;
		}
		saveEntry(bufferRest.slice(0,position));
		bufferRest = bufferRest.slice(position + 1);
	}
}

const saveEntry = (data) => {
	if (data) {
		data = data.split(',');
		rRestStream.pause();
		db.addRestaurant(data[0], data[1]).then((res) => {
			// for (let i = 0; i < data.reservations.length; i++) {
			//  	db.addReservation(data.id, data.reservations[i].dateToReserve, data.reservations[i].timeToReserve, data.reservations[i].partySize);
			// }
			rRestStream.resume();
		});
	}
}

