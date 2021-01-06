const getters = require('../src/getters.js');

/* * * * * * * * * * * * * * * * * * * * * * * 
 *   THIS SECTION CALCULATES STAT VALUES     *
 * * * * * * * * * * * * * * * * * * * * * * */

let ampTome = getters.getItemByName('amplifying tome');
let ampTomeCost = ampTome.gold.total;
let statValue2 = ampTome.stats.FlatMagicDamageMod;
let goldPerAp = ampTomeCost / statValue2;
let apPerGold = statValue2 / ampTomeCost;
console.log(ampTome);
console.log(`${goldPerAp} gold is worth 1 AP.`); 
console.log(`1 gold is worth ${apPerGold} AP`); 

let longSwordItem = getters.getItemByName('long sword');
let longSwordCost = longSwordItem.gold.total;
let statValue = longSwordItem.stats.FlatPhysicalDamageMod;
let goldPerAd = longSwordCost / statValue;
let adPerGold = statValue / longSwordCost;
console.log(longSwordItem);
console.log(`${goldPerAd} gold is worth 1 AD.`); 
console.log(`1 gold is worth ${adPerGold} AD`); 

const commonValues = {
	baseAD: 35, // long sword: 350g/10ad=35g/1ad
	baseAP: 21.75, // amp tome: 435g/20ap=21.75g/1ap
	baseMR: 18, // null magic mantle: 450g/25mr=18g/1mr
	baseAR: 20, // cloth armor: 300g/15ar=20g/1ar
	baseMN: 5, // faerie charm: 125g/25(%mn)=5g/1(%mn)
	baseHR: 3, // rejuvenation bead: 150g/50(%hr)=3g/1(%hr)
	baseHP: 2.66, // ruby crystal: 400g/150hp=2.66666666g/1hp
	baseMA: 1.4, // sapphire crystal: 350g/250mana=1.4g/1mana
};