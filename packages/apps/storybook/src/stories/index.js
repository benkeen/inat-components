import React from 'react';
import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import Introduction from './docs/introduction.md';
import ExampleSpeciesSelector from './components/SpeciesSelectorDemo';
import ProjectActivityDemo from './components/ProjectActivityDemo';


storiesOf('Documentation', module)
	.add('Project activity', () => (
	<div>
		{Introduction}
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

storiesOf('User Selector', module).add('Demo', () => (
	<div>

	</div>
));


storiesOf('Project Selector', module).add('Demo', () => (
	<div>

	</div>
));

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
