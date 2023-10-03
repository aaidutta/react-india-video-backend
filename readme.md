Backend for react india video.
Since Twitter V2 api get failed due to CORS, created this supplementary repository.

1. Set env variable: `export BEARER_TOKEN=...`
2. Run `node index.js` to create a tweet dump (this way you can save some twitter tokens. They are quite expensive)
3. Run `node app.js` to start a simple express server that serves the tweet dump.
