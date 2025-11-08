/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, ReactNode } from "react";
import useFavorites from "../hooks/useFavorites";
import { FavoriteGame } from "../services/favorites-storage";

interface FavoritesContextType {
	favorites: FavoriteGame[];
	toggleFavorite: (game: Omit<FavoriteGame, "addedAt">) => boolean;
	isFavorite: (gameId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
	const favoritesData = useFavorites();

	return <FavoritesContext.Provider value={favoritesData}>{children}</FavoritesContext.Provider>;
};

export const useFavoritesContext = () => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavoritesContext must be used within a FavoritesProvider");
	}
	return context;
};
