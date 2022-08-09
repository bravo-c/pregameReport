const Utils = require('../src/util.js');

test('adds 1 + 2 to equal 3', () => {
  expect(Utils.sum(1, 2)).toBe(3);
});

test('makes call to api and retrieves relevant response data', async () => {
    fetch.mockResponseOnce(JSON.stringify({movie: "Saving Private Ryan"}));

    let data = await Utils.makeAPICallAndReturnResponseData('http://example.com/movies.json');
    expect(data.movie).toBe("Saving Private Ryan");
});