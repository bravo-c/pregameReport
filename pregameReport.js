const _ = require('lodash');
const champions = require('./resources/champions.json');
const items = require('./resources/item.json');
const ornnUpgradesData = require('./resources/ornnUpgrades.json');

// getChampData: String -> ChampionObject (has a lot of fields)
// should be called in try catch loop if you don't want program to crash
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

// the same as getHpList, should abstract
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

// getHpList: String -> List[Number]
// for a given champion, calculate hp at each level and return it
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

// prettyPrintHP: String -> Void
// purely for the side effects, doesn't return anything 
function prettyPrintHP(champName) {
    const hpList = getHpList(champName);
    for (let idx = 0; idx < 18; idx++) {
        console.log(`${champName} health at level ${idx+1}: ${hpList[idx]}`);
    }
}

// the same as hp, should abstract
function prettyPrintArmor(champName) {
    const armorList = getArmorList(champName);
    for (let idx = 0; idx < 18; idx++) {
        console.log(`${champName} armor at level ${idx+1}: ${armorList[idx]}`);
    }
}

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

// print all champs sorted by armor
listPrinter(
    champions.data,
    (x, y) => {
        return x.stats.armor - y.stats.armor;
    }, 
    (x) => `${x.name} :: ${x.stats.armor}`);

// let cList = [];
// _.forEach(champions.data, (champ) => {
//     cList.push(champ);
// });
// cList = cList.sort((x, y) => {
//     return x.stats.armor - y.stats.armor;
// })
// let sortedArmorList = cList.map((x) => `${x.name} :: ${x.stats.armor}`);
// _.forEach(sortedArmorList, (element) => {
//     console.log(element);
// });

// let itemsList = [];
// _.forEach(items.data, (item) => {
//     itemsList.push(item);
// });
// itemsList = itemsList.sort((x, y) => {
//     return x.gold.total - y.gold.total;
// });
// let sortedItemList = itemsList.map((x) => `${x.name} :: ${x.gold.total} total Gold :: ${JSON.stringify(x.stats)}`);
// _.forEach(sortedItemList, (element) => {
//     console.log(element);
// });

// console.log();
// console.log(`total num champs: ${cList.length}`);
// console.log(`total num items: ${itemsList.length}`);

// function getItemById(itemId) {
//     return items.data[itemId];
// }

// function getItemByName(itemName) {
//     let found;
//     _.forEach(items.data, (item) => {
//         if (item.name.toLowerCase() === itemName.toLowerCase()) {
//             found = item;
//         }
//     });
//     return found || 'MISSION FAILED WE\'LL GET THEM NEXT TIME LADS.';
// }

// console.log(getItemById(1001));
// console.log(getItemByName('boots of speed'));
// console.log(getItemByName('rabadon\'s deathcap'));
// console.log(getItemById(3374));

// function getChampByName(champName) {
//     let found;
//     _.forEach(champions.data, (champ) => {
//         if (champ.name.toLowerCase() === champName.toLowerCase()) {
//             found = champ;
//         }
//     });
//     return found || 'damn';
// }

// let blocks = ornnUpgradesData.blocks;
// let blockList = [];
// _.forEach(blocks, (block) => {
//     if (block.type.toLowerCase() === 'ornnupgrades') {
//         blockList.push(block);
//     }
// });
// _.forEach(blockList[0].items, (item) => {
//     console.log(item);
//     console.log(getItemById(item.id));
// });

/* * * * * * * * * * * * * * * * * * * * * * * 
 *   THIS SECTION CALCULATES STAT VALUES     *
 * * * * * * * * * * * * * * * * * * * * * * */

// let longSwordItem = getItemByName('long sword');
// let longSwordCost = longSwordItem.gold.total;
// let statValue = longSwordItem.stats.FlatPhysicalDamageMod;
// let goldPerAd = longSwordCost / statValue;
// let adPerGold = statValue / longSwordCost;
// console.log(longSwordItem);
// console.log(`${goldPerAd} gold is worth 1 AD.`); 
// console.log(`1 gold is worth ${adPerGold} AD`); 

// let ampTome = getItemByName('amplifying tome');
// let ampTomeCost = ampTome.gold.total;
// let statValue2 = ampTome.stats.FlatMagicDamageMod;
// let goldPerAp = ampTomeCost / statValue2;
// let apPerGold = statValue2 / ampTomeCost;
// console.log(ampTome);
// console.log(`${goldPerAp} gold is worth 1 AP.`); 
// console.log(`1 gold is worth ${apPerGold} AP`); 

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