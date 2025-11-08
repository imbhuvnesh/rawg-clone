import { SimpleGrid, Text, Box, Spinner } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import useInfiniteGames from "../hooks/useInfiniteGames";
import { GameCard } from "./GameCard";
import { GameCardSkeleton } from "./GameCardSkeleton";
import { GameCardContainer } from "./GameCardContainer";
import { GameQuery } from "../App";

interface Props {
	gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
	const { data, error, isLoading, isFetchingMore, hasMore, fetchMore } = useInfiniteGames(gameQuery);
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
	const loadMoreRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !isFetchingMore && !isLoading) {
					fetchMore();
				}
			},
			{ threshold: 0.1 }
		);

		const currentRef = loadMoreRef.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [hasMore, isFetchingMore, isLoading, fetchMore]);

	return (
		<>
			{error && <Text>{error}</Text>}
			<SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding="10px" spacing={5}>
				{isLoading &&
					skeletons.map((skeleton) => (
						<GameCardContainer key={skeleton}>
							<GameCardSkeleton />
						</GameCardContainer>
					))}
				{data.map((game) => (
					<GameCardContainer key={game.id}>
						<GameCard game={game} />
					</GameCardContainer>
				))}
			</SimpleGrid>

			{/* Load more trigger */}
			<Box ref={loadMoreRef} height="20px" marginY={4} />

			{/* Loading indicator for fetching more */}
			{isFetchingMore && (
				<Box display="flex" justifyContent="center" padding={8}>
					<Spinner size="lg" />
				</Box>
			)}

			{/* End of results message */}
			{!isLoading && !hasMore && data.length > 0 && (
				<Box textAlign="center" padding={8}>
					<Text color="gray.500">No more games to load</Text>
				</Box>
			)}
		</>
	);
};

export default GameGrid;
