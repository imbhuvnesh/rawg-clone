const FAVORITES_KEY = "gamehub_favorites";

export interface FavoriteGame {
	id: number;
	name: string;
	background_image: string;
	metacritic: number;
	addedAt: number;
}

export const getFavorites = (): FavoriteGame[] => {
	try {
		const favoritesJson = localStorage.getItem(FAVORITES_KEY);
		return favoritesJson ? JSON.parse(favoritesJson) : [];
	} catch (error) {
		console.error("Error reading favorites from localStorage:", error);
		return [];
	}
};

export const saveFavorites = (favorites: FavoriteGame[]): void => {
	try {
		localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
	} catch (error) {
		console.error("Error saving favorites to localStorage:", error);
	}
};

export const addFavorite = (game: Omit<FavoriteGame, "addedAt">): void => {
	const favorites = getFavorites();
	const exists = favorites.some((fav) => fav.id === game.id);

	if (!exists) {
		const newFavorite: FavoriteGame = {
			...game,
			addedAt: Date.now(),
		};
		saveFavorites([newFavorite, ...favorites]);
	}
};

export const removeFavorite = (gameId: number): void => {
	const favorites = getFavorites();
	const filtered = favorites.filter((fav) => fav.id !== gameId);
	saveFavorites(filtered);
};

export const isFavorite = (gameId: number): boolean => {
	const favorites = getFavorites();
	return favorites.some((fav) => fav.id === gameId);
};

export const toggleFavorite = (game: Omit<FavoriteGame, "addedAt">): boolean => {
	if (isFavorite(game.id)) {
		removeFavorite(game.id);
		return false;
	} else {
		addFavorite(game);
		return true;
	}
};
