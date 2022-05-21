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