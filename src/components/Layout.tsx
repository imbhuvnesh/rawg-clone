import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { GenreList } from "./GenreList";
import { Genre } from "../hooks/useGenres";

interface Props {
	selectedGenre?: Genre | null;
	onSelectGenre?: (genre: Genre) => void;
	onSearch?: (searchText: string) => void;
	showSidebar?: boolean;
}

const noopSearch = () => {
	// This is intentionally empty for game detail page
};

const noopGenreSelect = () => {
	// This is intentionally empty for game detail page
};

const Layout = ({ selectedGenre, onSelectGenre, onSearch, showSidebar = true }: Props) => {
	return (
		<Grid
			templateAreas={{
				base: `"nav"  "main"`,
				lg: showSidebar ? `"nav nav" "aside main"` : `"nav nav" "main main"`,
			}}
			templateColumns={{
				base: "1fr",
				lg: showSidebar ? "250px 1fr" : "1fr",
			}}>
			<GridItem area="nav">
				<NavBar onSearch={onSearch || noopSearch} />
			</GridItem>
			{showSidebar && (
				<Show above="lg">
					<GridItem area="aside" paddingX={4}>
						<GenreList selectedGenre={selectedGenre || null} onSelectGenre={onSelectGenre || noopGenreSelect} />
					</GridItem>
				</Show>
			)}
			<GridItem area="main">
				<Outlet />
			</GridItem>
		</Grid>
	);
};

export default Layout;
