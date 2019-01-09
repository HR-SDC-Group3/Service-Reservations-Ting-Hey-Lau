const fs = require('fs');
const faker = require('faker');
const path = require('path');

const wstream = fs.createWriteStream(__dirname + '/data.txt');
let i = 0;

const WriteOne = () => {
	while (i < 10000000){
		let res = [];
		for (let j = 0; j < Math.floor(Math.random()*5); j++) {
			let date = faker.date.past();
			res.push({
				id: j,
				dateToReserve: date.getDay().toString() + date.getMonth().toString() + date.getFullYear().toString(),
				timeToReserve: date.getHours().toString() + date.getMinutes().toString(), 
				partySize: Math.floor(Math.random()*5).toString(),
			})
			let entry = {
				id: i,
				name: faker.company.companyName(),
				reservations: res,
			};
			if(!wstream.write(JSON.stringify(entry))) {
				return;
			}
			i++;
		}
	}
	wstream.end();
};

wstream.on('drain', () => {
	WriteOne();
});

WriteOne();
