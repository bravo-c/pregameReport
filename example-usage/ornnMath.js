const _ = require('lodash');
const getters = require('../src/getters.js');
const ornnUpgradesData = require('../resources/ornnUpgrades.json');

let blocks = ornnUpgradesData.blocks;
let blockList = [];
_.forEach(blocks, (block) => {
	if (block.type.toLowerCase() === 'ornnupgrades') {
		blockList.push(block);
	}
});
_.forEach(blockList[0].items, (item) => {
	console.log(item);
	console.log(getters.getItemById(item.id));
});
console.log(blockList[0].items.length);