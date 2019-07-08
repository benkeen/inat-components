import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import debounce from 'debounce';


class UserObservations extends Component {
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

		this.debouncedGetData = debounce(this.getData, 250);
	}

	render () {
		return (
			<div>
				...
			</div>
		);
	}
}

export default SpeciesSelector;
