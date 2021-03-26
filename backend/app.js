// Imports
const express = require("express");
const bodyParser = require("body-parser");
const elasticsearch = require("elasticsearch");
const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const {getMetadata} = require('page-metadata-parser');
const domino = require('domino');
const fetch = require('node-fetch');
const cors = require('cors');

const env = process.env;

// Initializing App
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(env.PORT || 8080, () => {
	console.log("server connected");
});

mongoose.connect(env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/univsearch', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err)=> {
	if (err) {
		console.log("Mongoose couldn't connect to MongoDB");
		console.log(err);
	} else {
		console.log("Connected to MongoDb");
	}
});

// Schema
let UnivSchema = new mongoose.Schema({
	alpha_two_code: String,
	country: String,
	domain: String,
	name: String,
	web_page: String,
	description:String,
	image: String,
	title: String,
});

// Modal
const Univ = mongoose.model("University", UnivSchema)

/* 
	// Connecting with Elastic Search using mongoosastic
	UnivSchema.plugin(mongoosastic, {
		"host": env.ES_HOST ||"localhost",
		"port": env.ES_PORT || 9200
	});

	// Mapping indexes on ES
	Univ.createMapping(function(err, mapping){  
		if(err){
			console.log('error creating mapping');
			console.log(err);
		}else{
			console.log('mapping created!');
			console.log(mapping);
		}
	});
*/

// Utils
const getMetaDataFromURL = async(url) => {
	try {
		const response = await fetch(url);
		const html = await response.text();
		const doc = domino.createWindow(html).document;
		const metadata = getMetadata(doc, url);
		return metadata;
	} catch (err) {
		console.log(err);
		return {};
	}
};

// CRUD Operations begins here
app.post("/university", async (req, res) => {

	try {
		// Parsing Metatags from web page
		const url = req.body.web_page;
		const metadata = await getMetaDataFromURL(url);

		const {
			description = "",
			image="",
			title=""
		} = metadata;

		const univ = new Univ({  
			alpha_two_code: req.body.alpha_two_code,
			country: req.body.country,
			domain: req.body.domain,
			name: req.body.name,
			web_page: req.body.web_page,
			description,
			image,
			title
		});
		const postResponse = await univ.save();
		console.log(postResponse);
		res.json({postResponse});
	} catch(err) {
		console.log(err);
		res.status(500).json({err});
	}

});

app.get("/universities", async (req, res) => {
	const {
		alpha_two_code="",
		domain="",
		searchTerm = "",
	} = req.query;

	const page = parseInt(req.query.page, 10) || 0;
	const limit = parseInt(req.query.limit, 10) || 10;
	

	const query = {};

	if (searchTerm !== "") {
		query.name = searchTerm;
	}

	if (alpha_two_code !== "") {
		query.alpha_two_code = alpha_two_code;
	}

	if (domain !== "") {
		query.domain = domain;
	}

	try {
		const universities = await Univ.find(query, null, { skip: page, limit }).exec();
		const totalCount = await Univ.countDocuments(query).exec();
		res.json({data: universities, totalCount, limit, page});
	} catch(err) {
		res.status(500).json({err});
	}

});

app.get("/university/:id", async (req, res) => {
	const {id} = req.params;
	try { 
		const univ = await Univ.findById(id).exec();
		res.json({data: univ});
	}
	catch (err) {
		res.status(500).send({err});
	}
});

app.patch("/university/:id", async (req, res) => {
	console.log(req.params)
	const {id} = req.params;
	const {
		alpha_two_code,
		country,
		domain,
		name,
		web_page,
	} = req.body;

	let metadata = {}
	if (web_page) {
		metadata = await getMetaDataFromURL(web_page);
	}

	const {
		description = "",
		image = "",
		title= ""
	} = metadata;

	const doc = {
		alpha_two_code,
		country,
		domain,
		name,
		web_page,
		description,
		image,
		title
	};

	try {
		const univ = await Univ.updateOne({"_id": id}, doc, {omitUndefined: true}).exec();
		res.status(204).json({});
	}
	catch (err) {
		res.status(500).send({err});
	}
});

app.delete("/university/:id", async (req, res) => {
	const {id} = req.params;
	try {
		const univ = await Univ.deleteOne({"_id": id}).exec();
		res.status(204).send({});
	}
	catch (err) {
		res.status(500).send({err});
	}
});

app.get("/countrycodes", async (req, res) => {
	try {
		const countryCodes = await Univ.distinct("alpha_two_code").exec();
		res.json({data: countryCodes});
	} catch(err) {
		console.log(err);
		res.status(500).send({err});
	}
});

app.get("/domains", async (req, res) => {
	try {
		const domains = await Univ.distinct("domain").exec();
		res.json({data: domains});
	} catch(err) {
		console.log(err);
		res.status(500).send({err})
	}
});