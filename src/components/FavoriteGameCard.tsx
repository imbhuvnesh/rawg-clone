import { Card, CardBody, Heading, Image, IconButton, Box, HStack, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import getCroppedImgUrl from "../services/image-url";
import { useFavoritesContext } from "../contexts/FavoritesContext";
import { FavoriteGame } from "../services/favorites-storage";

interface Props {
	game: FavoriteGame;
}

export const FavoriteGameCard = ({ game }: Props) => {
	const { toggleFavorite } = useFavoritesContext();

	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		toggleFavorite({
			id: game.id,
			name: game.name,
			background_image: game.background_image,
			metacritic: game.metacritic,
		});
	};

	return (
		<Card
			as={Link}
			to={`/games/${game.id}`}
			_hover={{ transform: "scale(1.03)", transition: "transform 0.15s ease-in" }}
			cursor="pointer"
			overflow="hidden"
			position="relative">
			<Image src={getCroppedImgUrl(game.background_image)} />
			<Box position="absolute" top={2} right={2}>
				<IconButton
					aria-label="Remove from favorites"
					icon={<FaHeart />}
					onClick={handleFavoriteClick}
					colorScheme="red"
					variant="solid"
					size="sm"
					borderRadius="full"
					_hover={{ transform: "scale(1.1)" }}
				/>
			</Box>
			<CardBody>
				<HStack justifyContent="space-between" marginBottom={3}>
					<Box />
					{game.metacritic && (
						<Badge colorScheme={game.metacritic > 75 ? "green" : game.metacritic > 60 ? "yellow" : ""} fontSize="14px" paddingX={2}>
							{game.metacritic}
						</Badge>
					)}
				</HStack>
				<Heading fontSize="2xl">{game.name}</Heading>
			</CardBody>
		</Card>
	);
};
