import useFetch from "./useFetch";

export interface Genre {
	id: number;
	name: string;
}

const useGenres = () => useFetch<Genre>("/genres");

export default useGenres;
