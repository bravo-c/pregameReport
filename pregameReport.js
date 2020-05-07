const _ = require('lodash');
const champions = require('./resources/champions.json');

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

// prettyPrintHP('Jax');
// prettyPrintHP('Zed');
prettyPrintArmor('Zed');

let cList = [];
_.forEach(champions.data, (champ) => {
    cList.push(champ);
});
cList = cList.sort((x, y) => {
    return x.stats.armor - y.stats.armor;
})
let sortedList = cList.map((x) => `${x.name}:${x.stats.armor}`);
_.forEach(sortedList, (element) => {
    console.log(element);
});