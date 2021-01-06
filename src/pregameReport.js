const utils = require('./util.js');
const champions = require('../resources/champions.json');
const items = require('../resources/item.json');

function main () {
	// print all champs sorted by armor
	utils.listPrinter(
		champions.data,
		(x, y) => {
			return x.stats.armor - y.stats.armor;
		}, 
		(x) => `${x.name} :: ${x.stats.armor}`);

	// print all items sorted by gold
	utils.listPrinter(
		items.data,
		(x, y) => {
			return x.gold.total - y.gold.total;
		},
		(x) => `${x.name} :: ${x.gold.total} total Gold :: ${JSON.stringify(x.stats)}`);

	console.log();

	const numChamps = Object.keys(champions.data).length;
	const numItems = Object.keys(items.data).length;

	console.log(`total num champs: ${numChamps}`);
	console.log(`total num items: ${numItems}`);
}

main();