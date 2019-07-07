import React, { Component } from 'react';
import { ActivityChartPanel } from '@inat-components/activity-chart';
import ProjectSelector from '@inat-components/project-selector';
import './styles.css';


export default class ActivityChartDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: null,
			showActivity: false
		};
		this.selectProject = this.selectProject.bind(this);
	}

	selectProject(info) {
		if (!info || !info.data) {
			return;
		}
		this.setState({
			project: info.data,
			showActivity: true
		});
	}

	clearProject() {
		this.setState({ project: null, showActivity: false });
	}

	getActivityChart() {
		const { project, showActivity } = this.state;
		if (!showActivity) {
			return null;
		}
		return (
			<section style={{ marginTop: 20 }}>
				<h1>{project.title}</h1>
				<ActivityChartPanel
					projectId={project.id}
					endpoint={this.props.activityChartEndpoint} />
			</section>
		);
	}

	render() {
		return (
			<div>
				<div className="selectProjectPanel">
					<label>Select a project</label>
					<div style={{ width: 300 }}>
						<ProjectSelector
							endpoint={this.props.projectSelectorEndpoint}
							onSelect={this.selectProject}
							onClear={this.clearProject}
						/>
					</div>
				</div>
				{this.getActivityChart()}
			</div>
		);
	}
}