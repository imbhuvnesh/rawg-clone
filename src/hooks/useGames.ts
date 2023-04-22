import { GameQuery } from "../App";
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

const useGames = (gameQuery: GameQuery) =>
	useFetch<Game>(
		"/games",
		{
			params: { genres: gameQuery.genre?.id, platforms: gameQuery.platform?.id },
		},
		[gameQuery]
	);

export default useGames;
