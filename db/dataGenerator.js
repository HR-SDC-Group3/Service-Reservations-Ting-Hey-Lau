const fs = require('fs');
const faker = require('faker');
const path = require('path');
const format = require('date-fns/format');

const wRestStream = fs.createWriteStream(__dirname + '/restaurants.csv', {flags: 'w'});
const wResStream = fs.createWriteStream(__dirname + '/reservations.csv', {flags: 'w'});

const generateName = () => `${faker.commerce.productAdjective()} ${faker.commerce.department()} ${faker.commerce.product()}`;

const generateRestaurantId = () => Math.floor(Math.random() * 100 + 1);

const generateDate = () => format(Date.parse(faker.date.future()), 'MMDDYY');

const generateTime = () => (Math.floor(Math.random() * (23 - 10) + 10) * 100)
  + (Math.floor(Math.random() * 2) * 30);

const generatePartySize = () => Math.floor(Math.random() * 19 + 1);

let i = 0;

const WriteOne = () => {
	while (i < 10000000){
		for (let j = 0; j < Math.ceil(Math.random()*5); j++) {
			wResStream.write(`${i},${generateDate()},${generateTime()},${generatePartySize()}\n`);
		}
		if (!wRestStream.write(`${i},${generateName()}\n`)) {
			i++;
			return;
		}
		i++;
	}
	wResStream.end();
	wRestStream.end();
};

wRestStream.on('drain', () => {
	WriteOne();
});

WriteOne();
