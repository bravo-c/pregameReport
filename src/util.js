const _ = require('lodash');
const getters = require('./getters.js');
/**
 * Prints the health a champion has at each level.
 * 
 * @param {String} champName - should be the name of a champ
 */
function prettyPrintHP(champName) {
	const hpList = getters.getHpList(champName);
	for (let idx = 0; idx < 18; idx++) {
		console.log(`${champName} health at level ${idx+1}: ${hpList[idx]}`);
	}
}

/**
 * Prints the armor a champion has at each level.
 * 
 * @param {String} champName - should be the name of a champ
 */
function prettyPrintArmor(champName) {
	const armorList = getters.getArmorList(champName);
	for (let idx = 0; idx < 18; idx++) {
		console.log(champName);
		console.log(`${champName} armor at level ${idx+1}: ${armorList[idx]}`);
	}
}

/**
 * Prints a list generated from JSON data neatly via its consumed sorting order and formatted via its map function.
 * 
 * @param {JSON}     objData  - A JSON Object representing a certain list of data items from the Riot API 
 * @param {Function} sortFunc - A function that determines the sorting order of the output list
 * @param {Function} mapFunc  - A function that maps over the output list to format the output
 */
function listPrinter(objData, sortFunc, mapFunc) {
	let genericList = [];
	_.forEach(objData, (obj) => {
		genericList.push(obj);
	});
	genericList = genericList.sort(sortFunc).map(mapFunc);
	_.forEach(genericList, (element) => {
		console.log(element);
	});
}

/**
 * A utility function since Riot has weird naming conventions in their JSON.
 * 
 * @param {String} weirdName - a name from the JSON file that does not match our colloquial usage
 * @returns {String} the normal name
 * @throws an error when a given weird name doesn't exist in our switchionary.
 */
function mapWeirdStatsToNormalNames(weirdName) {
	switch(weirdName.toLowerCase) {
	case 'PercentAttackSpeedMod'.toLowerCase():
		return 'AS';
	case 'FlatSpellBlockMod'.toLowerCase():
		return 'MR';
	case 'PercentLifeStealMod'.toLowerCase():
		return 'LIFESTEAL';
	case 'FlatPhysicalDamageMod'.toLowerCase():
		return 'AD';
	case 'FlatMagicDamageMod'.toLowerCase():
		return 'AP';
	default:
		console.error(`${weirdName} doesn't have a normal name.`);
		throw 'Ah shit, mb.';
	}
}

/**
 * Another utility function since Riot has weird naming conventions in their JSON.
 * 
 * @param {*} normalName - a name that we use colloquially for a particular stat
 * @returns {String} the weird name.
 * @throws an error when a given stat doesn't exist in our switchionary.
 */
function mapNormalNamesToWeirdStatsNames(normalName) {
	switch(normalName.toLowerCase) {
	case 'as':
		return 'PercentAttackSpeedMod';
	case 'mr':
		return 'FlatSpellBlockMod';
	case 'lifesteal':
		return 'PercentLifeStealMod';
	case 'ad':
		return 'FlatPhysicalDamageMod';
	default:
		console.error(`${normalName} doesn't have a weird name.`);
		throw 'Ah shit, mb.';
	}
}

module.exports.listPrinter = listPrinter;