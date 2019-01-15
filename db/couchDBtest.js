const auth = require('./couchConfig.js');
const nano = require('nano')(`http://${auth.user}:${auth.pass}@localhost:5984`);
const path = require('path');
const database = require('./couchDB.js');
const opts = {url:`http://${auth.user}:${auth.pass}@localhost:5984`, database:'opentablereservations', type: "jsonl", delimiter:'\n'};

const res = nano.db.use('opentablereservations');
console.time('insert restaurant');
database.addRestaurant(10010000, 'OMEGALUL', res => {
	console.log('insert restaurant', res); 
	console.timeEnd('insert restaurant');
});
console.time('insert reservation');
database.addReservation(10010000, '080619', '1430', '10', res => {
	console.log('add reservation', res); 
	console.timeEnd('insert reservation');
});
console.time('find');
database.getReservations(10010000, '080619', res => {
	console.log('get reservations', res); 
	console.timeEnd('find');
});
console.time('update');
database.updateReservation(10010000, '080619', '1430', '10', '061019', '1415','10',input => {
	console.log('update reservation', input); 
	console.timeEnd('update');
});
console.time('delete');
database.deleteReservation(10010000, '061019', '1415', '10', res => {
	console.log('delete reservation', res); 
	console.timeEnd('delete');
});




