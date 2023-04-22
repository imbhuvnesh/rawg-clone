import useFetch from "./useFetch";

export interface Platform {
	id: number;
	name: string;
	slug: string;
}

export interface Game {
	id: number;
	name: string;
	background_image: string;
	parent_platforms: { platform: Platform }[];
	metacritic: number;
}

const useGames = () => useFetch<Game>("/games");
console.log("useGames: ", useGames);

export default useGames;
