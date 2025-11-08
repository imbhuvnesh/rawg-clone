import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/useGames";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import GameDetailPage from "./pages/GameDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ScrollToTop from "./components/ScrollToTop";

export interface GameQuery {
	genre: Genre | null;
	platform: Platform | null;
	sortOrder: string;
	searchText: string;
}

function App() {
	const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route
					path="/"
					element={
						<Layout
							selectedGenre={gameQuery.genre}
							onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
							onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
							showSidebar={true}
						/>
					}>
					<Route
						index
						element={
							<HomePage
								gameQuery={gameQuery}
								onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform })}
								onSelectSortOrder={(sortOrder) => setGameQuery({ ...gameQuery, sortOrder })}
							/>
						}
					/>
				</Route>
				<Route path="/favorites" element={<Layout showSidebar={false} />}>
					<Route index element={<FavoritesPage />} />
				</Route>
				<Route path="/games/:id" element={<Layout showSidebar={false} />}>
					<Route index element={<GameDetailPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
