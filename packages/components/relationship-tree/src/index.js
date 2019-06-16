import React, { Component } from 'react';
import './App.css';
import ComparisonGraph from './ComparisonGraph';
import { appendBranch, recurseAppend } from "./helpers";


class App extends Component {
	constructor (props) {
		super(props);
		this.search = this.search.bind(this);
		this.onChangeObservationId = this.onChangeObservationId.bind(this);
	}

	state = {
		taxonIds: [],
		nextObservationId: '',
		data: [],
		treeData: null
	};

	callApi = async (observationId) => {
		const response = await fetch(`/api/taxon?id=${observationId}`);
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};

	getTables () {
		return this.state.data.map((data, index) => (
			<table className="table" key={index}>
				<tbody>
				{this.showTable(data)}
				</tbody>
			</table>
		));
	}

	showTable (data) {
		return data.ancestors.map((item) => (
			<tr key={item.id}>
				<td>
					<img src={item.default_photo.square_url} width={32} height={32} alt=""/>
				</td>
				<td>
					{item.rank}
				</td>
				<td>
					{item.name}
					<span>({item.observations_count})</span>
				</td>
			</tr>
		));
	}

	search (e) {
		e.preventDefault();

		this.setState((state) => {
			this.callApi(this.state.nextObservationId)
				.then(res => {
					this.setState((state) => {
						let newTreeData = [];

						if (state.treeData === null) {
							appendBranch(res.ancestors, newTreeData);
						} else {
							newTreeData = JSON.parse(JSON.stringify(state.treeData));
							recurseAppend(res.ancestors, newTreeData);
						}

						console.log(res);

						return {
							data: [...state.data, res],
							treeData: newTreeData
						};
					});
				})
				.catch(err => console.log(err));

			return {
				taxonIds: [...state.taxonIds, state.nextObservationId],
				nextObservationId: ''
			};
		});
	}

	showSelectedPills () {
		return this.state.taxonIds.map((taxonId) => (
			<span className="pill" key={taxonId}>
				{taxonId}
				<span>x</span>
			</span>
		));
	}

	onChangeObservationId (e) {
		this.setState({
			nextObservationId: e.target.value
		});
	}

	render () {
		const { nextObservationId, treeData, data } = this.state;

		const treeDataObj = (data.length === 0) ? null : {
			name: `${treeData[0].name} (${treeData[0].rank})`,
			children: treeData[0].children
		};

		return (
			<section>
				<form onSubmit={this.search}>
					<input type="text" size={10} value={nextObservationId} onChange={this.onChangeObservationId}/>
					<input type="submit" value="Search" />
				</form>

				<span className="pill-block">
				{this.showSelectedPills()}
				</span>

				<hr size="1" />

				{this.getTables()}

				<ComparisonGraph data={treeDataObj} numItems={data.length} />
			</section>
		);
	}
}

export default App;
