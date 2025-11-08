import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Platform } from "./useGames";
import { Genre } from "./useGenres";

export interface GameDetails {
	id: number;
	name: string;
	description_raw: string;
	background_image: string;
	parent_platforms: { platform: Platform }[];
	metacritic: number;
	genres: Genre[];
	publishers: { id: number; name: string }[];
	developers: { id: number; name: string }[];
	released: string;
	rating: number;
	rating_top: number;
	ratings: { id: number; title: string; count: number; percent: number }[];
	playtime: number;
	screenshots_count: number;
}

const useGameDetails = (id: string) => {
	const [data, setData] = useState<GameDetails | null>(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController();

		setIsLoading(true);
		apiClient
			.get<GameDetails>(`/games/${id}`, { signal: controller.signal })
			.then((res) => {
				setData(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				if (err instanceof CanceledError) return;
				setError(err.message);
				setIsLoading(false);
			});

		return () => controller.abort();
	}, [id]);

	return { data, error, isLoading };
};

export default useGameDetails;
