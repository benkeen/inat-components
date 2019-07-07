import React, { Component } from 'react';
import {
	BarChart, LineChart, AreaChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import PropTypes from 'prop-types';
import * as helpers from './helpers';


class ProjectActivity extends Component {
	constructor (props) {
		super(props);
		this.state = {
			loaded: false,
			chartType: 'bar', // 'chart', 'bar', 'line
			dataGrouping: 'year', // 'year', 'month_of_year'
			yearData: null,
			monthOfYearData: null,
			color: '#3399cc'
		};

		this.onSuccess = this.onSuccess.bind(this);
		this.onError = this.onError.bind(this);
		this.onChangeChartType = this.onChangeChartType.bind(this);
		this.onChangeDataGrouping = this.onChangeDataGrouping.bind(this);

		this.fetchData(props.projectId, this.state.dataGrouping);
	}

	fetchData (projectId, dataGrouping) {
		helpers.fetchProjectData({ projectId, dataGrouping }, this.onSuccess, this.onError);
	}

	// if the user just selected a new grouping & we haven't pinged the server for it yet, do so
	componentDidUpdate () {
		const { dataGrouping, yearData, monthOfYearData } = this.state;
		if ((dataGrouping === 'year' && yearData === null) ||
			(dataGrouping === 'month_of_year' && monthOfYearData === null)) {
			this.fetchData(this.props.projectId, dataGrouping);
		}
	}

	onSuccess (resp) {
		const { dataGrouping } = this.state;

		let newState = {
			loaded: true
		};

		// assumption is that the dataGrouping in state is still correct here
		if (dataGrouping === 'year') {
			newState.yearData = Object.keys(resp.results.year).map((date) => {
				const [year] = date.split('-');
				return {
					name: year,
					obsCount: resp.results.year[date]
				}
			});
		} else {
			const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			newState.monthOfYearData = Object.keys(resp.results.month_of_year).map((monthNum) => {
				return {
					name: monthNames[monthNum-1],
					obsCount: resp.results.month_of_year[monthNum]
				}
			});
		}

		this.setState(newState);
	}

	onError(resp) {
		console.log('error:', resp);
	}

	onChangeChartType (chartType) {
		this.setState({ chartType });
	}

	onChangeDataGrouping (dataGrouping) {
		this.setState({ dataGrouping });
	}

	getChart () {
		const { dataGrouping, chartType, yearData, monthOfYearData, color } = this.state;

		let data = yearData;
		if (dataGrouping === 'month_of_year') {
			data = monthOfYearData;
		}

		if (chartType === 'bar') {
			return (
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="obsCount" fill={color} name="Num observations" />
				</BarChart>
			);
		}
		if (chartType === 'line') {
			return (
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="obsCount" stroke={color} name="Num observations" />
				</LineChart>
			);
		}

		return (
			<AreaChart data={data}>
				<defs>
					<linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={color} stopOpacity={0.8} />
						<stop offset="95%" stopColor={color} stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis dataKey="name" />
				<YAxis />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<Legend />
				<Area type="monotone" dataKey="obsCount" stroke={color} fillOpacity={1} name="Num observations" fill="url(#gradient)" />
			</AreaChart>
		);
	}

	render () {
		const { loaded, chartType, dataGrouping } = this.state;

		if (!loaded) {
			return <span>Loading...</span>;
		}

		return (
			<div>
				<br />
				<br />

				<section style={{ display: 'flex', height: 400, flexDirection: 'row' }}>
					<div style={{ flex: '0 0 auto' }}>
						<div>
							Chart type:
							<select value={chartType} onChange={(e) => this.onChangeChartType(e.target.value)}>
								<option value="bar">Bar chart</option>
								<option value="line">Line chart</option>
								<option value="area">Area chart</option>
							</select>
						</div>

						<div>
							Date range
							<ul>
								<li><input type="radio" /> All years</li>
								<li><input type="radio" /> Year: <input type="text" size="5" /></li>
								<li><input type="radio" /> Year range: <input type="text" size="5" />&#8212;<input type="text" size="5" /></li>
							</ul>
						</div>

						<div>
							Data grouping:
							<select value={dataGrouping} onChange={(e) => this.onChangeDataGrouping(e.target.value)}>
								<option value="year">By year</option>
								<option value="month_of_year">Month of year</option>
							</select>
						</div>

						Quality grade


						Native
						Endemic
						Out of range
						introduced
						Threatened


					</div>
					<div style={{ flex: 1 }}>
						<ResponsiveContainer>
							{this.getChart()}
						</ResponsiveContainer>
					</div>
				</section>
			</div>
		);
	}
}
ProjectActivity.propTypes = {
	projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default ProjectActivity;

