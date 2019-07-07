import React from 'react';
import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Introduction from './docs/introduction.md';

import UserSelectorReadme from '@inat-components/user-selector/README.md';

import ActivityChartReadme from '@inat-components/activity-chart/README.md';
import ActivityChartDemo from './components/ActivityChartDemo';

import ProjectSelectorReadme from '@inat-components/project-selector/README.md';
import ProjectSelectorDemo from './components/ProjectSelectorDemo';

import SpeciesSelectorReadme from '@inat-components/species-selector/README.md';
import ExampleSpeciesSelector from './components/SpeciesSelectorDemo';

//
const API_SERVER = 'http://localhost:5000';


// general documentation
storiesOf('Documentation', module).add('Intro', doc(Introduction));

storiesOf('UserSelector', module).add('README', doc(UserSelectorReadme));
storiesOf('UserSelector', module).add('Demo', () => (
	<div>
		...
	</div>
));


storiesOf('Project Selector', module).add('README', doc(ProjectSelectorReadme));
storiesOf('Project Selector', module).add('Example', () => (
	<div>
		<h1>Project Selector</h1>
		<ProjectSelectorDemo endpoint={`${API_SERVER}/api/projectSelector`} />
	</div>
));
storiesOf('Project Selector', module).add('Node proxy', () => (
	<div>
		<h1>Node proxy example</h1>

		<p>
			This is taken from the source code of this repo. To demonstrate working versions of the components, a simple
			node express server is booted up when the application runs. That is accessible via <code>localhost:5000</code>
			and allow client-side code to make requests to it. The code below shows how it exposes an
			<code>/api/projectSelector</code> endpoint which acts as a proxy to the iNaturalist server, returning the
			appropriate data.
		</p>

		<p>
			This is here as an example. You can implement this in whatever language you want.
		</p>

		<SyntaxHighlighter language="javascript" style={docco}>{`const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const newApiBaseUrl = 'https://api.inaturalist.org/v1';

/**
 * For: <ProjectSelector />
 * ------------------------
 */
app.get('/api/projectSelector', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const str = req.query.str;
	Promise.all([
		axios.get(newApiBaseUrl + '/projects/autocomplete?q=' + str + '&per_page=10')
	]).then((values) => {
		res.send(values[0].data.results);
	});
});`}</SyntaxHighlighter>
	</div>
));

storiesOf('Species Selector', module).add('README', doc(SpeciesSelectorReadme));
storiesOf('Species Selector', module)
	.add('Example', () => (
		<div>
			<h1>Species selector</h1>
			<ExampleSpeciesSelector endpoint={`${API_SERVER}/api/taxonautocomplete`} />
		</div>
	));

storiesOf('Species Selector', module)
	.add('Creating pills', () => (
		<div style={{ width: 300 }}>
			<h1>Species selector</h1>
			<ExampleSpeciesSelector clearOnSelect endpoint={`${API_SERVER}/api/taxonautocomplete`} />
		</div>
	));

storiesOf('Activity Chart', module).add('README', doc(ActivityChartReadme));
storiesOf('Activity Chart', module).add('ActivityChartPanel', () => (
	<div>
		<ActivityChartDemo
			projectSelectorEndpoint={`${API_SERVER}/api/projectSelector`}
			activityChartEndpoint={`${API_SERVER}/api/activityChart`}
		/>
	</div>
));

storiesOf('Activity Chart', module).add('Users', () => (
	<div>
		<h1>Activity Chart: Users</h1>
		<ActivityChartDemo endpoint={`${API_SERVER}/api/activityChart`} />
	</div>
));
