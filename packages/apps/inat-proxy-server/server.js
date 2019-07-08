const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const newApiBaseUrl = 'https://api.inaturalist.org/v1';


/**
 * For: <SpeciesSelector />
 * ------------------------
 */
app.get('/api/taxonautocomplete', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const str = req.query.str;
	Promise.all([
		axios.get(`${newApiBaseUrl}/taxa/autocomplete?q=${str}&per_page=10`)
	]).then((values) => {

		// return a teensy subset of all the data (you don't have to do this, it just reduces bandwidth for your users)
		const results = values[0].data.results.map(({ name, rank, preferred_common_name, default_photo }) => ({
			name,
			rank,
			preferred_common_name,
			image: default_photo ? default_photo.square_url : null
		}));

		res.send(results);
	});
});


/**
 * For: <ProjectSelector />
 * ------------------------
 */
app.get('/api/projectSelector', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const str = req.query.str;
	Promise.all([
		axios.get(`${newApiBaseUrl}/projects/autocomplete?q=${str}&per_page=10`)
	]).then((values) => {
		res.send(values[0].data.results);
	});
});

// place_id=7085&taxon_id=47157&user_id=benkeen

/**
 * For: <ActivityChart />
 * ----------------------
 */
app.get('/api/activityChart', (req, res) => {
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




/**
 * For: <UserObservations />
 * ------------------------
 */
app.get('/api/userObservations', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const taxonId = req.query.taxon_id;
	const userId = req.query.user_id;
	const placeId = req.query.place_id;

	// observations?place_id=7085&rank=genus%2Cspecies&taxon_id=47157&user_id=1148374&order=desc&order_by=created_at

	Promise.all([
		axios.get(`${newApiBaseUrl}/observations?taxon_id=${taxonId}&user_id=${userId}&place_id=${placeId}&per_page=1000`)
	]).then((values) => {
		res.send(values[0].data.results);
	});
});

// app.get('/api/taxon', (req, res) => {
// 	const observationId = req.query.id;
// 	Promise.all([
// 		axios.get(`${newApiBaseUrl}/taxa/${observationId}`)
// 	]).then((values) => {
// 		res.send(values[0].data.results[0]);
// 	});
// });


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



app.listen(port, () => console.log(`Listening on port ${port}`));