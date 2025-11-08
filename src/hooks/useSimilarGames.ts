import useFetch from "./useFetch";
import { Game } from "./useGames";

const useSimilarGames = (gameId: string) => useFetch<Game>(`/games/${gameId}/game-series`);

export default useSimilarGames;
