import { useState, useEffect } from "react";
import { getFavorites, toggleFavorite as toggleFavoriteStorage, FavoriteGame } from "../services/favorites-storage";

const useFavorites = () => {
	const [favorites, setFavorites] = useState<FavoriteGame[]>([]);

	useEffect(() => {
		setFavorites(getFavorites());
	}, []);

	const toggleFavorite = (game: Omit<FavoriteGame, "addedAt">) => {
		const isFavorited = toggleFavoriteStorage(game);
		setFavorites(getFavorites());
		return isFavorited;
	};

	const isFavorite = (gameId: number) => {
		return favorites.some((fav) => fav.id === gameId);
	};

	return {
		favorites,
		toggleFavorite,
		isFavorite,
	};
};

export default useFavorites;
