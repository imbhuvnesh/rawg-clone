import useFetch from "./useFetch";

export interface Screenshot {
	id: number;
	image: string;
	width: number;
	height: number;
}

const useGameScreenshots = (gameId: string) => useFetch<Screenshot>(`/games/${gameId}/screenshots`);

export default useGameScreenshots;
