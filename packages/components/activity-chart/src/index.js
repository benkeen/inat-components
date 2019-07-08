import React, { Component } from 'react';
import {
	BarChart, LineChart, AreaChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import * as helpers from './helpers';



class ActivityChart extends Component {
	render () {

		const { color, chartType, data } = this.props;
		let chart = null;

		if (chartType === 'bar') {
			chart = (
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3"/>
					<XAxis dataKey="name"/>
					<YAxis/>
					<Tooltip/>
					<Legend/>
					<Bar dataKey="obsCount" fill={color} name="Num observations"/>
				</BarChart>
			);
		} else if (chartType === 'line') {
			chart = (
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3"/>
					<XAxis dataKey="name"/>
					<YAxis/>
					<Tooltip/>
					<Legend/>
					<Line type="monotone" dataKey="obsCount" stroke={color} name="Num observations"/>
				</LineChart>
			);
		} else {
			chart = (
				<AreaChart data={data}>
					<defs>
						<linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor={color} stopOpacity={0.8}/>
							<stop offset="95%" stopColor={color} stopOpacity={0}/>
						</linearGradient>
					</defs>
					<XAxis dataKey="name"/>
					<YAxis/>
					<CartesianGrid strokeDasharray="3 3"/>
					<Tooltip/>
					<Legend/>
					<Area type="monotone" dataKey="obsCount" stroke={color} fillOpacity={1} name="Num observations"
					      fill="url(#gradient)"/>
				</AreaChart>
			);
		}

		return (
			<ResponsiveContainer>
				{chart}
			</ResponsiveContainer>
		)
	}
};


class ActivityChartPanel extends Component {
	constructor (props) {
		super(props);
		this.state = {
			loaded: false,
			chartType: 'bar', // 'chart', 'bar', 'line
			dataGrouping: 'year', // 'year', 'month_of_year', 'day'
			qualityGrade: '',
			data: {}
		};

		this.onSuccess = this.onSuccess.bind(this);
		this.onError = this.onError.bind(this);
		this.onChangeChartType = this.onChangeChartType.bind(this);
		this.onChangeDataGrouping = this.onChangeDataGrouping.bind(this);
		this.onChangeQualityGrade = this.onChangeQualityGrade.bind(this);

		this.fetchData(props.endpoint, props.projectId, this.state.dataGrouping, this.state.qualityGrade);
	}

	fetchData (endpoint, projectId, dataGrouping, qualityGrade) {
		helpers.fetchProjectData({ endpoint, projectId, dataGrouping, qualityGrade }, this.onSuccess, this.onError);
	}

	// simple way to serialize any settings that require a fresh request. The key returned it used to know whether
	// we already have the info available
	getRequestKey () {
		const { dataGrouping, qualityGrade } = this.state;
		const { projectId } = this.props;
		return `${projectId}|${dataGrouping}|${qualityGrade}`;
	}

	componentDidUpdate () {
		const { dataGrouping, qualityGrade, data } = this.state;
		const { projectId, endpoint } = this.props;

		if (!data.hasOwnProperty(this.getRequestKey())) {
			this.fetchData(endpoint, projectId, dataGrouping, qualityGrade);
		}
	}

	onSuccess (resp) {
		const { dataGrouping, data } = this.state;

		let newState = {
			loaded: true,
			data
		};

		const key = this.getRequestKey();
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		// assumption is that the dataGrouping in state is still correct here
		if (dataGrouping === 'year') {
			newState.data[key] = Object.keys(resp.results.year).map((date) => {
				const [year] = date.split('-');
				return {
					name: year,
					obsCount: resp.results.year[date]
				}
			});
		} else if (dataGrouping === 'day') {
			newState.data[key] = Object.keys(resp.results.day).map((currDayDate) => {
				const [year, month, day] = currDayDate.split('-');
				return {
					name: `${monthNames[month-1]} ${parseInt(day, 10)}`,
					obsCount: resp.results.day[currDayDate]
				}
			});
		} else {
			newState.data[key] = Object.keys(resp.results.month_of_year).map((monthNum) => {
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

	onChangeQualityGrade (qualityGrade) {
		this.setState({ qualityGrade });
	}

	render () {
		const { spinnerColor, color } = this.props;
		const { loaded, chartType, data, dataGrouping, qualityGrade } = this.state;

		if (!loaded) {
			return (
				<div>
					<ClipLoader sizeUnit="px" size={40} color={spinnerColor} />
				</div>
			);
		}

		const currData = data[this.getRequestKey()];

		return (
			<section style={{ display: 'flex', flexDirection: 'row', height: 400 }}>
				<div style={{ flex: '0 0 auto' }}>
					<table>
					<tbody>
					<tr>
						<td>Chart type</td>
						<td>
							<select value={chartType} onChange={(e) => this.onChangeChartType(e.target.value)}>
								<option value="bar">Bar chart</option>
								<option value="line">Line chart</option>
								<option value="area">Area chart</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Data grouping</td>
						<td>
							<select value={dataGrouping} onChange={(e) => this.onChangeDataGrouping(e.target.value)}>
								<option value="year">By year</option>
								<option value="month_of_year">Month of year</option>
								<option value="day">Last year's daily obs</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Quality grade</td>
						<td>
							<select value={qualityGrade} onChange={(e) => this.onChangeQualityGrade(e.target.value)}>
								<option value="">All</option>
								<option value="casual">Casual</option>
								<option value="needs_id">Needs ID</option>
								<option value="research">Research</option>
							</select>
						</td>
					</tr>
					</tbody>
					</table>
				</div>
				<div style={{ flex: '1 1 auto' }}>
					<ActivityChart
						color={color}
						chartType={chartType}
						data={currData}
					/>
				</div>
			</section>
		);
	}
}
ActivityChartPanel.propTypes = {
	projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	endpoint: PropTypes.string.isRequired,
	color: PropTypes.string,
	spinnerColor: PropTypes.string
};

ActivityChartPanel.defaultProps = {
	color: '#3399cc',
	spinnerColor: '#000000'
};

export {
	ActivityChartPanel,
	ActivityChart
};

