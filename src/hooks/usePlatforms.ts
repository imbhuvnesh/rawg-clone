import useFetch from "./useFetch";

interface Platform {
	id: number;
	name: string;
	slug: string;
}

const usePlatforms = () => useFetch<Platform>("/platforms/lists/parents");

export default usePlatforms;
