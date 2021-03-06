import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import debounce from 'debounce';
import styles from './styles.scss';


const SpeciesRow = ({ innerProps, data }) => {
	return (
		<div {...innerProps} className={styles.row}>
			<img src={data.image} width={32} height={32} />
			<div>
				<span className={`${styles.rank} ${styles[data.rank]}`}>{data.rank}</span>
				<h4>{data.name}</h4>
				<div>{data.preferred_common_name}</div>
			</div>
		</div>
	);
};

class SpeciesSelector extends Component {
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

	getData (inputValue, callback) {
		const { endpoint } = this.props;
		if (inputValue === '') {
			callback([]);
		}
		axios.get(`${endpoint}?str=${inputValue}`)
			.then((resp) => {
				callback((resp.data.length) ? resp.data : []);
			});
	};

	//
	// const loadOptions = (inputValue, callback) => {
	// 	debouncedGetData(inputValue, callback);
	// };
	//

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
				loadOptions={this.debouncedGetData}
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

export default SpeciesSelector;
