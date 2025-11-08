import { Box, HStack } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import { PlatformSelector } from "../components/PlatformSelector";
import { SortSelector } from "../components/SortSelector";
import GameHeading from "../components/GameHeading";
import { GameQuery } from "../App";
import { Platform } from "../hooks/useGames";

interface Props {
	gameQuery: GameQuery;
	onSelectPlatform: (platform: Platform) => void;
	onSelectSortOrder: (sortOrder: string) => void;
}

const HomePage = ({ gameQuery, onSelectPlatform, onSelectSortOrder }: Props) => {
	return (
		<Box paddingLeft={2}>
			<GameHeading gameQuery={gameQuery} />
			<HStack spacing={5} marginBottom={5}>
				<PlatformSelector selectedPlatform={gameQuery.platform} onSelectPlatform={onSelectPlatform} />
				<SortSelector sortOrder={gameQuery.sortOrder} onSelectSortOrder={onSelectSortOrder} />
			</HStack>
			<GameGrid gameQuery={gameQuery} />
		</Box>
	);
};

export default HomePage;
