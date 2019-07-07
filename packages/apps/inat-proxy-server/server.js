const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const newApiBaseUrl = 'https://api.inaturalist.org/v1';
const oldApiBaseUrl = 'https://www.inaturalist.org';


// NEW API calls ----------------------------------------------------------------------------------------

app.get('/api/taxon', (req, res) => {
	const observationId = req.query.id;
	Promise.all([
		axios.get(`${newApiBaseUrl}/taxa/${observationId}`)
	]).then((values) => {
		res.send(values[0].data.results[0]);
	});
});

// used for the species-selector autocomplete component
app.get('/api/taxonautocomplete', (req, res) => {

	// Access-Control-Allow-Origin: http://localhost:3000
	res.header("Access-Control-Allow-Origin", "*");

	const str = req.query.str;
	Promise.all([
		axios.get(`${newApiBaseUrl}/taxa/autocomplete?q=${str}&per_page=10`)
	]).then((values) => {

		// return a teensy subset of all the data
		const results = values[0].data.results.map(({ name, rank, preferred_common_name, default_photo }) => ({
			name,
			rank,
			preferred_common_name,
			image: default_photo ? default_photo.square_url : null
		}));

		res.send(results);
	});
});


app.get('/api/projectActivity', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	const projectId = req.query.projectId;
	const dataGrouping = req.query.dataGrouping;
	const qualityGrade = req.query.qualityGrade;

	const url = `${newApiBaseUrl}/observations/histogram/?project_id=${projectId}&date_field=created&interval=${dataGrouping}&quality_grade=${qualityGrade}`;
	Promise.all([
		axios.get(url)
	]).then((resp) => {
		res.send(resp[0].data);
	}).catch((resp) => {
		console.log('error.', resp.request);
	});
});



// app.get('/api/taxa', (req, res) => {
// 	Promise.all([
// 		axios.get(`${baseUrl}/taxa?rank=kingdom`),
// 		axios.get(`${baseUrl}/observations/species_counts?rank=kingdom&user_id=${userId}`),
// 		axios.get(`${baseUrl}/observations/taxon_stats.json?user_id=${userId}`)
// 	]).then((values) => {
// 		const found = {};
// 		values[1].data.results.map(({ count, taxon }) => {
// 			found[taxon.id] = { count };
// 		});
//
// 		const cleanData = {
// 			name: 'Kingdoms',
// 			children: values[0].data.results.map((taxon) => ({
// 				name: taxon.name,
// 				totalCount: taxon.observations_count,
// 				numObservations: (found[taxon.id] && found[taxon.id].count) ? found[taxon.id].count : 0,
// 				children: []
// 			}))
// 		};
//
// 		res.send(cleanData);
// 	});
// });


// OLD API calls ----------------------------------------------------------------------------------------



app.listen(port, () => console.log(`Listening on port ${port}`));