import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import debounce from 'debounce';


const getData = (endpoint, inputValue, callback) => {
	if (inputValue === '') {
		callback([]);
	}
	axios.get(`${endpoint}?str=${inputValue}`)
		.then((resp) => {
			callback((resp.data.length) ? resp.data : []);
		});
};

const debouncedGetData = debounce(getData, 250);

const loadOptions = (inputValue, callback) => {
	debouncedGetData(inputValue, callback);
};

class ProjectSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			value: '',
			menuIsOpen: false
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	handleInputChange (newValue, { action }) {
		const newState = {};
		if (action === "menu-close") {
			newState.menuIsOpen = false;
		} else if (newValue !== '') {
			newState.menuIsOpen = true;
		}

		newState.inputValue = newValue.replace(/\W/g, '');
		this.setState(newState);

		return newState.inputValue;
	}

	onSelect (item) {
		this.setState({ value: item });
		this.props.onSelect(item);
	}

	render () {
		return (
			<AsyncSelect
				cacheOptions
				loadOptions={loadOptions}
				defaultOptions
				styles={{
					menu: () => ({
						border: '1px solid #cccccc',
						borderRadius: 3,
						margin: '6px 0 0 0',
						padding: 0
					})
				}}
				onInputChange={this.handleInputChange}
				isClearable={true}
				components={{
					Option: SpeciesRow,
					SingleValue: SpeciesRow,
					DropdownIndicator: () => null
				}}
				menuIsOpen={this.state.menuIsOpen}
				onChange={this.onSelect}
				value={this.state.value}
			/>
		);
	}
}
SpeciesSelector.propTypes = {
	onSelect: PropTypes.func.isRequired,
	endpoint: PropTypes.string.isRequired
};

export default ProjectSelector;
