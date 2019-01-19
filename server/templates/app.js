module.exports = (array) => `${array.map(item => 
	`<div id="${item}">${item}</div>`
).join('\n')}`;