// Search for Tweets within the past seven days

const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getRequest(req, res) {
         console.log("=====hefre",req.query.tags)
    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
    const params = {
         query: req.query.tags,
        'tweet.fields': 'author_id'
    }

    const resp = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (resp.body) {
        console.log("======resp",resp.body)
        return resp.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

async function gethashtags (req,res) {
    try {
        console.log("=====here")
        console.log("=====hefre",req.query.tags)

        // Make request
        const response = await getRequest(req,res);
       return res.json({response: response?.data})
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
}

module.exports = gethashtags