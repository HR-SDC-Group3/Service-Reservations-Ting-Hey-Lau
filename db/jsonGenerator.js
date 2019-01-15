const faker = require('faker');
const path = require('path');
const format = require('date-fns/format');
const jsonfile = require('jsonfile');

const generateName = () => `${faker.commerce.productAdjective()} ${faker.commerce.department()} ${faker.commerce.product()}`;

const generateDate = () => format(Date.parse(faker.date.future()), 'MMDDYY');

const generateTime = () => (Math.floor(Math.random() * (23 - 10) + 10) * 100)
  + (Math.floor(Math.random() * 2) * 30);

const generatePartySize = () => Math.floor(Math.random() * 19 + 1);

const file = path.join(__dirname, 'data3.jsonl');

let i = 0;

const WriteOne = () => {
	while (i < 10000000){
		let res = [];
		let entry = {};
		for (let j = 0; j < Math.ceil(Math.random()*5); j++) {
			res.push({
				datetoreserve: generateDate().toString(),
				timetoreserve: generateTime().toString(),
				partysize: generatePartySize().toString()
			})
		}
		entry = {
			id: i,
			restaurantname: generateName().toString(),
			reservations: res,
		};
		  jsonfile.writeFileSync(file, entry, {flag: 'a'});
		i++;
	}
};


WriteOne();