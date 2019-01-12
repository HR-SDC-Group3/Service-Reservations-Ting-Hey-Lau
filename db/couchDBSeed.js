const auth = require('./couchConfig.js');
const nano = require('nano')(`http://${auth.user}:${auth.pass}@localhost:5984`);
const path = require('path');
const jsonlines = require('jsonlines');
const Promise = require('bluebird');
const fs = require('fs');
const parser = jsonlines.parse();
const rStream = fs.createReadStream(path.join(__dirname, 'data2.jsonl'));
const opts = {url:`http://${auth.user}:${auth.pass}@localhost:5984`, database:'opentablereservations', type: "jsonl", delimiter:'\n'};

let check = false;

async function seeder() {

	await nano.db.list().then(body => {
		body.forEach((name) => {
			if (name === 'opentablereservations') {
				check = true;
				nano.db.destroy(name).then(() => {
					nano.db.create('opentablereservations').then(() => {
						const database = nano.db.use('opentablereservations');
						rStream.pipe(parser);
						parser.on('data', data => {
							database.insert({
								restaurantname: data.restaurantname,
								reservations: data.reservations
							}, data.id.toString(), (err, res) => {
								if (err) {
									console.log(err);
								} else {
									console.log(res);
								}
							})
						});
						parser.on('end', () => {
							console.log('no more data');
						});
						rStream.on('end', () => {
							parser.end();
						})
					})
				})
			}
		});
		if (!check) {
			nano.db.create('opentablereservations').then(() => {
				const database = nano.db.use('opentablereservations');
				rStream.pipe(parser);
				parser.on('data', data => {
					database.insert({
						restaurantname: data.restaurantname,
						reservations: data.reservations
					}, data.id.toString(), (err, res) => {
						if (err) {
							console.log(err);
						} else {
							console.log(res);
						}
					})
				});
				parser.on('end', () => {
					console.log('no more data');
				});
				rStream.on('end', () => {
					parser.end();
				});
			});	
		}	
	});
}

seeder();

