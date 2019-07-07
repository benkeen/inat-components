import React from 'react';
import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import Introduction from './docs/introduction.md';
import UserSelectorReadme from '@inat-components/user-selector/README.md';
import ProjectSelectorReadme from '@inat-components/project-selector/README.md';
import SpeciesSelectorReadme from '@inat-components/species-selector/README.md';
import ExampleSpeciesSelector from './components/SpeciesSelectorDemo';
import ProjectActivityDemo from './components/ProjectActivityDemo';

// general documentation
storiesOf('Documentation', module).add('Intro', doc(Introduction));

storiesOf('UserSelector', module).add('About', doc(UserSelectorReadme));
storiesOf('UserSelector', module).add('Demo', () => (
	<div>
		...
	</div>
));


storiesOf('Project Selector', module).add('About', doc(ProjectSelectorReadme));
storiesOf('Project Selector', module).add('Demo', () => (
	<div>

	</div>
));

storiesOf('Species Selector', module).add('About', doc(SpeciesSelectorReadme));
storiesOf('Species Selector', module)
	.add('Example', () => (
		<div>
			<h1>Species selector</h1>
			<ExampleSpeciesSelector />
		</div>
	));

storiesOf('Species Selector', module)
	.add('Creating pills', () => (
		<div style={{ width: 300 }}>
			<ExampleSpeciesSelector clearOnSelect />
		</div>
	));

storiesOf('Activity Charts', module).add('Project activity', () => (
	<div>
		<ProjectActivityDemo />
	</div>
));

storiesOf('Activity Charts', module).add('User activity', () => (
	<div>
		<ProjectActivityDemo />
	</div>
));
