import { Box, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useSimilarGames from "../hooks/useSimilarGames";
import { Card, CardBody, Image } from "@chakra-ui/react";
import getCroppedImgUrl from "../services/image-url";

interface Props {
	gameId: string;
}

const SimilarGames = ({ gameId }: Props) => {
	const { data: games, isLoading, error } = useSimilarGames(gameId);

	if (isLoading) {
		return (
			<Box>
				<Heading size="md" marginBottom={4}>
					Similar Games
				</Heading>
				<Spinner />
			</Box>
		);
	}

	if (error || !games || games.length === 0) {
		return null;
	}

	return (
		<Box>
			<Heading size="md" marginBottom={4}>
				You Might Also Like
			</Heading>
			<SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
				{games.slice(0, 8).map((game) => (
					<Card
						key={game.id}
						as={Link}
						to={`/games/${game.id}`}
						_hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
						cursor="pointer"
						overflow="hidden">
						<Image src={getCroppedImgUrl(game.background_image)} height="150px" objectFit="cover" />
						<CardBody padding={3}>
							<Text fontSize="sm" fontWeight="semibold" noOfLines={2}>
								{game.name}
							</Text>
						</CardBody>
					</Card>
				))}
			</SimpleGrid>
		</Box>
	);
};

export default SimilarGames;
