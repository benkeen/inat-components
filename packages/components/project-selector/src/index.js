import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import debounce from 'debounce';


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
		this.getData = this.getData.bind(this);

		this.debouncedGetData = debounce(this.getData, props.debounceTime);
	}

	getData (inputValue, callback) {
		const { endpoint } = this.props;
		if (inputValue === '') {
			callback([]);
		}
		axios.get(`${endpoint}?str=${inputValue}`)
			.then((resp) => {

				// convert the data into a format AsyncSelect likes
				let data = [];
				if (resp.data.length) {
					data = resp.data.map((item, index) => ({
						value: index,
						label: item.title,
						data: item
					}));
				}

				callback(data);
			});
	}

	handleInputChange (newValue, { action }) {
		const newState = {};
		if (action === "menu-close") {
			newState.menuIsOpen = false;
		} else if (newValue !== '') {
			newState.menuIsOpen = true;
		}
		this.setState(newState);
		return newState.inputValue;
	}

	onSelect (item) {
		this.setState({ value: item });
		this.props.onSelect(item);
	}

	render () {
		const { options } = this.state;

		return (
			<AsyncSelect
				cacheOptions
				loadOptions={this.debouncedGetData}
				defaultOptions
				options={options}
				styles={{
					menu: () => ({
						border: '1px solid #cccccc',
						borderRadius: 3,
						margin: '6px 0 0 0',
						padding: 0,
						position: 'absolute',
						zIndex: 2,
						backgroundColor: 'white'
					})
				}}
				onInputChange={this.handleInputChange}
				isClearable={true}
				menuIsOpen={this.state.menuIsOpen}
				onChange={this.onSelect}
				value={this.state.value}
			/>
		);
	}
}

ProjectSelector.propTypes = {
	onSelect: PropTypes.func.isRequired,
	onClear: PropTypes.func,
	endpoint: PropTypes.string.isRequired,
	debounceTime: PropTypes.number
};
ProjectSelector.defaultProps = {
	onClear: () => {},
	debounceTime: 500
};

export default ProjectSelector;
