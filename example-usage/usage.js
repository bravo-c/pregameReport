const getters = require('../src/getters.js');

// boots of speed
console.log(getters.getItemById(1001));
console.log(getters.getItemByName('boots of speed'));

// deathcap
console.log(getters.getItemByName('rabadon\'s deathcap'));

// ornn upgraded deathcap
console.log(getters.getItemById(3374));

console.log(getters.getItemByName('ruby crystal'));
console.log(getters.getItemByName('forbidden idol'));

// kindlegem = (150health=400g) (10cdr)=400g -(50 health)=400g/3
// forbidden idol = 550 base gold (250gold from 2 faerie charms)
// 10 cdr and 5healshieldpower


// TODO x*y y can be the constants from statmath
console.log(`ability power: 75ap is worth -> ${75*21.75} gold coins.`);
console.log(`armor: 45ar is worth -> ${45*20} gold coins.`);
console.log(`cooldown reduction: 10% is worth -> ${75*21.75} gold coins.`);