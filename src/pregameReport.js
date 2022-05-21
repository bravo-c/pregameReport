const Utils = require('./util.js');
const champions = require('../resources/champions.json');
const items = require('../resources/item.json');

function main () {
	Utils.printChampsSortedByArmor();
	Utils.printItemsSortedByCostInGold();

	const numChamps = Object.keys(champions.data).length;
	const numItems = Object.keys(items.data).length;
	console.log(`total num champs: ${numChamps}`);
	console.log(`total num items: ${numItems}`);
}

main();