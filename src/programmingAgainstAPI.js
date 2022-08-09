require("dotenv").config();
const axios = require("axios").default;

async function getUser(args) {
  try {
    const name = args && args.name ? args.name : "Stale%20Bagel";
    const response = await axios.get(
      `https://${process.env.PLATFORM_ROUTING_VALUE_NA1}/lol/summoner/v4/summoners/by-name/${name}`,
      {
        headers: {
          "X-Riot-Token": process.env.API_KEY,
        },
      }
    );
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// once we have a puuid
// we can hit the match v5 endpoint to get match ids back
// can also just use match id from tourney code if we have one?
// then once we hit the endpoint for matches/matchID
// we basically get all kinds of postgame stats by participant
// which we can determine both from the puuid and also the summoner name

getUser({name: "MattK"});
