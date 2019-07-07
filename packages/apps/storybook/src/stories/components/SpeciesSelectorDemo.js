import React, { Component } from 'react';
import Selector from '@inat-components/species-selector';


class ExampleSpeciesSelector extends Component {
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

export default ExampleSpeciesSelector;