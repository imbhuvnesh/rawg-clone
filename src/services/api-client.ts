import axios from "axios";

export default axios.create({
	baseURL: "https://api.rawg.io/api",
	params: {
		key: "b04f4870c8a540e19612d27d7829ee39",
	},
});
