import axios from 'axios';

const createApi = (baseURL) => {
	return axios.create({
		baseURL,
	});
};

const read = async (baseUrl, URI = '/') => {
	const api = createApi(baseUrl);
	const response = await api.get(URI);
	return response;
};

const add = async (baseUrl, body, URI = '/') => {
	const api = createApi(baseUrl);
	const response = await api.post(URI, body);
	return response;
};
const remove = () => {};

export { read, add, remove };
