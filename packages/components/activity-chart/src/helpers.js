import axios from 'axios';

export const fetchProjectData = ({ endpoint, projectId, dataGrouping, qualityGrade }, onSuccess, onError) => {

	axios.get(`${endpoint}/?projectId=${projectId}&dataGrouping=${dataGrouping}&qualityGrade=${qualityGrade}`)
		.then((resp) => onSuccess(resp.data))
		.catch(onError);
};