const fs = require('fs');
const faker = require('faker');
const path = require('path');
const format = require('date-fns/format');
const jsonfile = require('jsonfile');

const generateName = () => `${faker.commerce.productAdjective()} ${faker.commerce.department()} ${faker.commerce.product()}`;
const generateDate = () => format(Date.parse(faker.date.future()), 'MMDDYY');
const generateTime = () => (Math.floor(Math.random() * (23 - 10) + 10) * 100)
  + (Math.floor(Math.random() * 2) * 30);
const generatePartySize = () => Math.floor(Math.random() * 19 + 1);

let i = 0;
let sampleSize = 10000000;
let mode = 'JSON';
if (mode !== 'JSON'){
	const wRestStream = fs.createWriteStream(__dirname + '/restaurants2.csv', {flags: 'w'});
	const wResStream = fs.createWriteStream(__dirname + '/reservations2.csv', {flags: 'w'});

	wRestStream.write(`id,restaurantname\n`);
	wResStream.write(`restaurantid,datetoreserve,timetoreserve,partysize\n`);


	const WriteOne = () => {
		while (i < sampleSize){
			for (let j = 0; j < Math.ceil(Math.random()*5); j++) {
				if (!WriteRes(i)) {
					return;
				}
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

	const WriteRes = (i) => {
		return wResStream.write(`${i},${generateDate()},${generateTime()},${generatePartySize()}\n`)
	}

	wRestStream.on('drain', () => {
		WriteOne();
	});

	wResStream.on('drain', () => {
		WriteOne();
	})

	WriteOne();	
} else {
  const file = path.join(__dirname, 'data.jsonl');
	const WriteOne = () => {
		while (i < sampleSize){
			let res = [];
			let entry = {};
			for (let j = 0; j < Math.ceil(Math.random()*5); j++) {
				res.push({
					restaurantid: i,
					datetoreserve: generateDate(),
					timetoreserve: generateTime(),
					partysize: generatePartySize()
				})
			}
			entry = {
				id: i,
				restaurantname: generateName(),
				reservations: res,
			};
			  jsonfile.writeFileSync(file, entry, {flag: 'a'});
			  i++;
		}
	};


	WriteOne();
}
