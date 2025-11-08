import { Box, Heading, SimpleGrid, Text, Container, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFavoritesContext } from "../contexts/FavoritesContext";
import { FavoriteGameCard } from "../components/FavoriteGameCard";

const FavoritesPage = () => {
	const { favorites } = useFavoritesContext();

	if (favorites.length === 0) {
		return (
			<Container maxW="container.xl" padding={10}>
				<VStack spacing={6}>
					<Heading size="xl">Your Favorites</Heading>
					<Text color="gray.500" fontSize="lg">
						You haven't added any games to your favorites yet.
					</Text>
					<Button as={Link} to="/" colorScheme="blue" size="lg">
						Browse Games
					</Button>
				</VStack>
			</Container>
		);
	}

	return (
		<Box padding={5}>
			<Heading as="h1" marginY={5} fontSize="4xl" paddingLeft={2}>
				Your Favorites ({favorites.length})
			</Heading>
			<SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding="10px" spacing={5}>
				{favorites.map((game) => (
					<FavoriteGameCard key={game.id} game={game} />
				))}
			</SimpleGrid>
		</Box>
	);
};

export default FavoritesPage;
