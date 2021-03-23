// Imports
const express = require("express");
const bodyParser = require("body-parser");
const elasticsearch = require("elasticsearch");
const env = process.env;

// Initializing App
const app = express();
app.use(bodyParser.json());

app.listen(env.PORT || 3000, () => {
	console.log("server connected");
});

// Configuring esClient
const esClient = elasticsearch.Client({
	host: env.ES_HOST || "http://127.0.0.1:9200",
});


app.post("/universities", (req, res) => {
	esClient.index({
		index: 'universities',
		body: {
			"alpha_two_code": req.body.alphaTwoCode,
			"country": req.body.country,
			"domain": req.body.domain,
			"name": req.name,
			"web_page": req.webPage
		}
	})
	.then(response => {
		return res.json({response, "message": "Indexing successful"})
	})
	.catch(err => {
		return res.status(500).json({err, "message": "Error"})
	})
});

app.get("/universities", (req, res) => {
	const searchText = req.query.text
	esClient.search({
		index: "universities",
		body: {
			query: {
				match: {"name": searchText.trim()}
			}
		}
	})
	.then(response => {
		return res.json(response)
	})
	.catch(err => {
		return res.status(500).json({err, "message": "Error"})
	})
});
