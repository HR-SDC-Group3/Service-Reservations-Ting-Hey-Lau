const auth = require('./couchConfig.js');
const nano = require('nano')(`http://${auth.user}:${auth.pass}@localhost:5984`);
const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');
console.log(path.join(__dirname, 'restaurants.csv'));
const rRestStream = fs.createReadStream(path.join(__dirname, 'restaurants.csv'));
const rResStream = fs.createReadStream(path.join(__dirname, 'reservations.csv'));


async function seeder() {
	await nano.db.destroy('opentablereservations');
	await nano.db.create('opentablereservations');
	const restaurants = await nano.use('opentablereservations');
	const iRestStream = restaurants.attachment.insertAsStream('restaurants', 'restaurants.csv', null, 'text/csv', { rev: '12-150985a725ec88be471921a54ce91452'})
	  .on('end', (body) => {
	    console.log('done inserting restaurants', body);
	});
	await rRestStream.pipe(iRestStream);
	const iResStream = restaurants.attachment.insertAsStream('reservations', 'reservations.csv', null, 'text/csv', { rev: '12-150985a725ec88be471921a54ce91452'})
	  .on('end', (body) => {
	    console.log('done inserting reservations', body);
	});

	await rResStream.pipe(iResStream);
  // await restaurants.insert({omegalul: '4head'}, 'memes').then((body) => {
  // 	console.log(body);
  // });
  // await restaurants.find({selector:{_id: {'$eq': 'memes'}}}).then((doc) => {
  // 	console.log(doc);
  // });
}

seeder();

// nano.db.create('opentablereservations').then(() => {
// 	console.log('opebtablereservations db created poggers');
// 	nano.use('opentablereservations')
// }, err => {
// 	console.log('error route');
// 	if (err) {
// 		nano.db.destroy('opentablereservations').then(() => {
// 			nano.db.create('opentablereservations').then(() => {
// 				console.log('opebtablereservations db created poggers');
// 			}, err => {
// 				console.log('error occured ', err);
// 			})
// 		})
// 	} 	
// });