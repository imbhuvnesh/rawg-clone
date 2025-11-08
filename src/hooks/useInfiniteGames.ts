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

		const requestConfig: AxiosRequestConfig = {
			signal: controller.signal,
			params: {
				genres: gameQuery.genre?.id,
				platforms: gameQuery.platform?.id,
				ordering: gameQuery.sortOrder,
				search: gameQuery.searchText,
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
	}, [gameQuery.genre?.id, gameQuery.platform?.id, gameQuery.sortOrder, gameQuery.searchText]);

	const fetchMore = () => {
		if (isFetchingMore || !hasMore) return;

		setIsFetchingMore(true);
		const nextPage = page + 1;

		const requestConfig: AxiosRequestConfig = {
			params: {
				genres: gameQuery.genre?.id,
				platforms: gameQuery.platform?.id,
				ordering: gameQuery.sortOrder,
				search: gameQuery.searchText,
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
