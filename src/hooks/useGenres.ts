import useFetch from "./useFetch";

export interface Genre {
	id: number;
	name: string;
	image_background: string;
}

const useGenres = () => useFetch<Genre>("/genres");

export default useGenres;
