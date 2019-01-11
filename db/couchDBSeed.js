const nano = require('nano')('http://CouchDB:admin@localhost:5984');
const Promise = require('bluebird');
const fs = require('fs');

const rRestStream = fs.createReadStream('./restaurants.csv');
const rResStream = fs.createReadStream('./reservations.csv');

async function seeder() {
	await nano.db.destroy('opentablereservations');
	await nano.db.create('opentablereservations');
	const res = nano.db.use('opentablereservations');
	const iRestStream = db.attachment.insertAsStream('restaurants', 'restaurants.csv', null, 'text/csv', { rev: '12-150985a725ec88be471921a54ce91452'})
	  .on('end', () => {
      console.log('done inserting restaurants');
	});
	const iResStream = db.attachment.insertAsStream('restaurants', 'restaurants.csv', null, 'text/csv', { rev: '12-150985a725ec88be471921a54ce91452'})
    .on('end', () => {
    	console.log('done inserting reservations');
  });
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


module.exports = {
	res
}