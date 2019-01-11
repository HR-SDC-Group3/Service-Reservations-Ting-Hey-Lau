const NodeCouchDB = require('node-couchdb');
const Promise = require('bluebird');
const auth = require('./couchConfig.js');

const couch = new NodeCouchDB({'auth': auth});

couch.createDatabase('opentablereservations').then(() => {
	console.log('opebtablereservations db created poggers');
}, err => {
	if (err) {
		couch.dropDatabase('opentablereservations').then(() => {
			couch.createDatabase('opentablereservations').then(() => {
				console.log('opebtablereservations db created poggers');
			}, err => {
				console.log('error occured ', err);
			})
		})
	} 	
});


module.exports = {
	couch,
}