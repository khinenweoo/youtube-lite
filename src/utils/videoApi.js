import axios from "axios";

const API_BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
	method: "GET",
	url: "https://youtube-v31.p.rapidapi.com/search",
	headers: {
		"x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
		"x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
	},
};

export const fetchAPI = async (url) => {
	try {
		const { data } = await axios.get(`${API_BASE_URL}${url}`, options);
		return data;
	} catch (error) {
		console.error("Fetch API Error:", error);
		return null;
	}
};

export const searchVideos = async (query) => {
	return await fetchAPI(
		`/search?q=${query}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`
	);
};

export const getVideoDetails = async (videoId) => {
	return await fetchAPI(
		`/videos?part=contentDetails,snippet,statistics&id=${videoId}`
	);
};

export const getRelatedVideos = async (videoId) => {
	return await fetchAPI(
		`/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=10`
	);
};


export const getVideoComments = async (videoId) => {
	return await fetchAPI(
		`/commentThreads?part=snippet&videoId=${videoId}&maxResults=50`
	);
};


	
	