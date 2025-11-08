import { Box, HStack } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import { PlatformSelector } from "../components/PlatformSelector";
import { SortSelector } from "../components/SortSelector";
import GameHeading from "../components/GameHeading";
import FilterPanel from "../components/FilterPanel";
import { GameQuery } from "../App";
import { Platform } from "../hooks/useGames";

interface Props {
	gameQuery: GameQuery;
	onSelectPlatform: (platform: Platform) => void;
	onSelectSortOrder: (sortOrder: string) => void;
	onRatingChange: (min: number, max: number) => void;
	onDateChange: (startYear: string, endYear: string) => void;
	onClearFilters: () => void;
}

const HomePage = ({ gameQuery, onSelectPlatform, onSelectSortOrder, onRatingChange, onDateChange, onClearFilters }: Props) => {
	return (
		<Box paddingLeft={2}>
			<GameHeading gameQuery={gameQuery} />
			<HStack spacing={5} marginBottom={5}>
				<PlatformSelector selectedPlatform={gameQuery.platform} onSelectPlatform={onSelectPlatform} />
				<SortSelector sortOrder={gameQuery.sortOrder} onSelectSortOrder={onSelectSortOrder} />
			</HStack>
			<FilterPanel
				minRating={gameQuery.minRating || 0}
				maxRating={gameQuery.maxRating || 5}
				startYear={gameQuery.startYear || ""}
				endYear={gameQuery.endYear || ""}
				onRatingChange={onRatingChange}
				onDateChange={onDateChange}
				onClearFilters={onClearFilters}
			/>
			<GameGrid gameQuery={gameQuery} />
		</Box>
	);
};

export default HomePage;
