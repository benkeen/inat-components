import React, { Component } from 'react';
import ProjectActivity from '../../../../../components/activity-chart';


export default class ProjectActivityDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectId: 11306,
			showActivity: false
		};
		this.showProjectActivity = this.showProjectActivity.bind(this);
	}

	updateProjectId(projectId) {
		this.setState({ projectId })
	}

	showProjectActivity(e) {
		e.preventDefault();
		this.setState({ showActivity: true });
	}

	getProjectActivity() {
		const { projectId, showActivity } = this.state;
		if (!showActivity) {
			return null;
		}
		return (
			<ProjectActivity projectId={projectId} endpoint={this.props.endpoint} />
		);
	}

	render() {
		const { projectId } = this.state;
		return (
			<div>
				<form onSubmit={this.showProjectActivity}>
					Project ID:
					<input type="text" value={projectId} onChange={(e) => this.updateProjectId(e.target.value)} />
					<input type="submit" value="Show project activity" />
				</form>

				{this.getProjectActivity()}
			</div>
		);
	}
}