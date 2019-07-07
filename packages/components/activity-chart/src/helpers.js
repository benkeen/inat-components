import axios from 'axios';

const API_SERVER = 'http://localhost:5000';

export const fetchProjectData = ({ projectId, dataGrouping }, onSuccess, onError) => {
	axios.get(`${API_SERVER}/api/projectActivity/?projectId=${projectId}&dataGrouping=${dataGrouping}`)
		.then((resp) => onSuccess(resp.data))
		.catch(onError);
};