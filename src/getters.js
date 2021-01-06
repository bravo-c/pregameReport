const _ = require('lodash');
const champions = require('../resources/champions.json');
const items = require('../resources/item.json');

/**
 * Searches for a champions data within the champions.json file and pulls back the relevant JSON data if it's found.
 * 
 * @param {String} champName - the name of the champion to query.
 * @returns {JSON} the champion data associated with champName
 * @throws an error when champName is !isNaN or is not found within the champions.json file
 */
function getChampData(champName) {
	if (isNaN(champName)) {
		let titleCaseName = champName.substring(0,1).toUpperCase() + champName.substring(1).toLowerCase();
		if (champions.data[titleCaseName]) {
			return champions.data[titleCaseName];
		} else {
			console.error(`Oops! You tried to find champData for ${champName} which is not a champion's name.`);
			throw 'Oh shit, mb.';
		}
	} else {
		console.error(`Oops! You tried to find champData for ${champName} which is not a champion's name.`);
		throw 'Oh shit, mb.';
	}
}

/**
 * Gets the armor a champ has at each level and returns it as a list.
 * 
 * @param {String} championName - the name of the champion to query.
 * @returns {Array<Number>} a 0-indexed list containing the armor values for the champion named championName from levels 1 to 18.
 */
function getArmorList(championName) {
	let stats = getChampData(championName).stats;

	const champArmorList = [];
	const champArmorPerLevel = stats.armorperlevel;
	champArmorList.push(stats.armor);

	let armorAcc = champArmorList[0];
	for (let lvl = 2; lvl <= 18; lvl++) {
		armorAcc += champArmorPerLevel;
		champArmorList.push(armorAcc);
	}

	return champArmorList;
}

/**
 * Gets the hp a champ has at each level and returns it as a list.
 * 
 * @param {String} championName - the name of the champion to query.
 * @returns {Array.<Number>} a 0-indexed list containing the hp values for the champion named championName from levels 1 to 18.
 */
function getHpList(championName) {
	let stats = getChampData(championName).stats;

	const champHPList = [];
	const champHPPerLevel = stats.hpperlevel;
	champHPList.push(stats.hp);

	let hpAcc = champHPList[0];
	for (let lvl = 2; lvl <= 18; lvl++) {
		hpAcc += champHPPerLevel;
		champHPList.push(hpAcc);
	}

	return champHPList;
}

/**
 * Get item JSON data by its itemId.
 * 
 * @param {Number} itemId - the item ID for a particular item.
 * @returns {JSON} the item data associated with itemID.
 * @throws an error when the itemId provided is not found.
 */
function getItemById(itemId) {
	if (items.data[itemId]) {
		return items.data[itemId];
	} else {
		throw `The ID provided (${itemId}) was not found in items.json.`;
	}
}

/**
 * Get item JSON data by its name.
 * 
 * @param {String} itemName - the item's name.
 * @returns {JSON} the item data associated with itemName.
 * @throws an error when the itemName is not found.
 */
function getItemByName(itemName) {
	let found;
	// we ought to be able to do better than iteratively
	_.forEach(items.data, (item) => {
		if (item.name.toLowerCase() === itemName.toLowerCase()) {
			found = item;
		}
	});
    
	if (found) {
		return found;
	} else {
		throw `The itemName (${itemName}) provided did not match anything in items.json`;
	}
}

/**
 * Get champion JSON data by its name.
 * 
 * @param {String} champName - the name of the champion to find.
 * @returns {JSON} the champion data associated with champName.
 * @throws an error when the champName is not found.
 */
function getChampByName(champName) {
	let found;
	// we ought to be able to do better than iteratively
	_.forEach(champions.data, (champ) => {
		if (champ.name.toLowerCase() === champName.toLowerCase()) {
			found = champ;
		}
	});

	if (found) {
		return found;
	} else {
		throw `The champName (${champName}) provided did not match anything in champions.json`;
	}
}

module.exports.getChampData = getChampData;
module.exports.getArmorList = getArmorList;
module.exports.getHpList = getHpList;
module.exports.getItemById = getItemById;
module.exports.getItemByName = getItemByName;
module.exports.getChampByName = getChampByName;