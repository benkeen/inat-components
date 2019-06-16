import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Selector from '@benkeen/species-selector';


class ExampleSelector extends Component {
	constructor (props) {
		super(props);

		this.state = {
			lastSelectedValue: ''
		};
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect (item) {
		const result = item === null ? '' : JSON.stringify(item, null, '\t');
		this.setState({
			lastSelectedValue: result
		});
	}

	render () {
		return (
			<>
				<div style={{ width: 300 }}>
					<Selector onSelect={this.onSelect} />
				</div>

				<div style={{ marginTop: 20, padding: 10, width: '100%', whiteSpace: 'pre', color: '#999999' }}>
					{this.state.lastSelectedValue}
				</div>
			</>
		);
	}
}

storiesOf('Species Selector', module)
	.add('Example', () => (
		<div>
			<h1>Species selector</h1>
			<ExampleSelector />
		</div>
	));

storiesOf('Species Selector', module)
	.add('Creating pills', () => (
		<div style={{ width: 300 }}>
			<Selector clearOnSelect />
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
