// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

const needle = require("needle");
const fs = require("fs").promises;
const path = require("path");

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getRequest() {
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned
  const params = {
    query:
      "(#ReactIndia2023 OR @react_india OR reactindia OR ReactIndia2023) -from:react_india -is:retweet -is:reply",
    "tweet.fields": "public_metrics",
    expansions: "author_id",
    "user.fields": "description",
    max_results: "50",
  };

  const res = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const fileName = `data_${month}_${day}.json`;
const filePath = path.join("dumps", fileName);

(async () => {
  try {
    // Make request
    const response = await getRequest();
    // Write the response JSON to data.json (overwrite existing content)
    await fs.writeFile(filePath, JSON.stringify(response, null, 2), "utf8");
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();
