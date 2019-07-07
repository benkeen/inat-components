import React from 'react';
import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import Introduction from './docs/introduction.md';

import UserSelectorReadme from '@inat-components/user-selector/README.md';
import ActivityChartReadme from '@inat-components/activity-chart/README.md';

import ProjectSelectorReadme from '@inat-components/project-selector/README.md';
import ProjectActivityDemo from './components/ProjectActivityDemo';

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
storiesOf('Project Selector', module).add('Demo', () => (
	<div>

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
			<ExampleSpeciesSelector clearOnSelect endpoint={`${API_SERVER}/api/taxonautocomplete`} />
		</div>
	));

storiesOf('Activity Chart', module).add('README', doc(ActivityChartReadme));
storiesOf('Activity Chart', module).add('Projects', () => (
	<div>
		<ProjectActivityDemo endpoint={`${API_SERVER}/api/projectActivity`} />
	</div>
));

storiesOf('Activity Chart', module).add('Users', () => (
	<div>
		<ProjectActivityDemo endpoint={`${API_SERVER}/api/projectActivity`} />
	</div>
));
