import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";
import { Game } from "./useGames";
import { GameQuery } from "../App";

interface FetchResponse {
	count: number;
	next: string | null;
	results: Game[];
}

const useInfiniteGames = (gameQuery: GameQuery) => {
	const [data, setData] = useState<Game[]>([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const controller = new AbortController();

		setIsLoading(true);
		setData([]);
		setPage(1);
		setHasMore(true);

		// Build dates filter
		const datesFilter =
			gameQuery.startYear && gameQuery.endYear
				? `${gameQuery.startYear}-01-01,${gameQuery.endYear}-12-31`
				: gameQuery.startYear
				? `${gameQuery.startYear}-01-01,${new Date().getFullYear() + 2}-12-31`
				: gameQuery.endYear
				? `1980-01-01,${gameQuery.endYear}-12-31`
				: undefined;

		// Build metacritic filter (RAWG API uses 0-100 scale, we use 0-5, so multiply by 20)
		const metacriticFilter =
			gameQuery.minRating || gameQuery.maxRating
				? `${Math.round(gameQuery.minRating * 20)},${Math.round(gameQuery.maxRating * 20)}`
				: undefined;

		const requestConfig: AxiosRequestConfig = {
			signal: controller.signal,
			params: {
				genres: gameQuery.genre?.id,
				platforms: gameQuery.platform?.id,
				ordering: gameQuery.sortOrder,
				search: gameQuery.searchText,
				dates: datesFilter,
				metacritic: metacriticFilter,
				page: 1,
				page_size: 20,
			},
		};

		apiClient
			.get<FetchResponse>("/games", requestConfig)
			.then((res) => {
				setData(res.data.results);
				setHasMore(res.data.next !== null);
				setIsLoading(false);
			})
			.catch((err) => {
				if (err instanceof CanceledError) return;
				setError(err.message);
				setIsLoading(false);
			});

		return () => controller.abort();
	}, [
		gameQuery.genre?.id,
		gameQuery.platform?.id,
		gameQuery.sortOrder,
		gameQuery.searchText,
		gameQuery.minRating,
		gameQuery.maxRating,
		gameQuery.startYear,
		gameQuery.endYear,
	]);

	const fetchMore = () => {
		if (isFetchingMore || !hasMore) return;

		setIsFetchingMore(true);
		const nextPage = page + 1;

		// Build dates filter
		const datesFilter =
			gameQuery.startYear && gameQuery.endYear
				? `${gameQuery.startYear}-01-01,${gameQuery.endYear}-12-31`
				: gameQuery.startYear
				? `${gameQuery.startYear}-01-01,${new Date().getFullYear() + 2}-12-31`
				: gameQuery.endYear
				? `1980-01-01,${gameQuery.endYear}-12-31`
				: undefined;

		// Build metacritic filter
		const metacriticFilter =
			gameQuery.minRating || gameQuery.maxRating
				? `${Math.round(gameQuery.minRating * 20)},${Math.round(gameQuery.maxRating * 20)}`
				: undefined;

		const requestConfig: AxiosRequestConfig = {
			params: {
				genres: gameQuery.genre?.id,
				platforms: gameQuery.platform?.id,
				ordering: gameQuery.sortOrder,
				search: gameQuery.searchText,
				dates: datesFilter,
				metacritic: metacriticFilter,
				page: nextPage,
				page_size: 20,
			},
		};

		apiClient
			.get<FetchResponse>("/games", requestConfig)
			.then((res) => {
				setData((prevData) => [...prevData, ...res.data.results]);
				setHasMore(res.data.next !== null);
				setPage(nextPage);
				setIsFetchingMore(false);
			})
			.catch((err) => {
				if (err instanceof CanceledError) return;
				setError(err.message);
				setIsFetchingMore(false);
			});
	};

	return { data, error, isLoading, isFetchingMore, hasMore, fetchMore };
};

export default useInfiniteGames;
