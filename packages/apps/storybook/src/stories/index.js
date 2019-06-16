import React from 'react';
import { storiesOf } from '@storybook/react';
import Selector from '@benkeen/species-selector';

storiesOf('Species Selector', module)
	.add('Example', () => (
		<div style={{ width: 300 }}>
			<h1>Example selector</h1>
			<Selector />
		</div>
	));

const onSelect = () => {};

storiesOf('Species Selector', module)
	.add('Creating pills', () => (
		<div style={{ width: 300 }}>
			<Selector onSelect clearOnSelect />
		</div>
	));

storiesOf('Relationship Graph', module).add('Example', () => (
	<div>
		<blockquote>
			<pre>
variable carpet moth
american lappet moth
			</pre>
		</blockquote>
		...
	</div>
));
