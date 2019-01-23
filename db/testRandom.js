const fs = require('fs');
const faker = require('faker');
const path = require('path');
const format = require('date-fns/format');
const jsonfile = require('jsonfile');

const generateDate = () => format(Date.parse(faker.date.future()), 'MMDDYY');
const sampleSize = 10000000;
const file = path.join(__dirname, 'data.json');

let myObj = {
	"keys": ["restaurantID", "date"],
	"values":[]
}

for (let i = 0; i < 1000; i++) {
	myObj.values.push([Math.floor(Math.pow(Math.random(), 2)*sampleSize).toString(), generateDate()])
}

jsonfile.writeFile(file, myObj, (err) => {
	if (err) {
		console.log(err);
		return;
	}
})
