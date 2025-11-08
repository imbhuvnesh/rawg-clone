import { Game } from "../hooks/useGames";
import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlatformIconsList } from "./PlatformIconsList";
import { CriticScore } from "./CriticScore";
import getCroppedImgUrl from "../services/image-url";

interface Props {
	game: Game;
}

export const GameCard = ({ game }: Props) => {
	return (
		<Card
			as={Link}
			to={`/games/${game.id}`}
			_hover={{ transform: "scale(1.03)", transition: "transform 0.15s ease-in" }}
			cursor="pointer"
			overflow="hidden">
			<Image src={getCroppedImgUrl(game.background_image)} />
			<CardBody>
				<HStack justifyContent="space-between" marginBottom={3}>
					<PlatformIconsList platforms={game.parent_platforms.map((p) => p.platform)} />
					<CriticScore score={game.metacritic} />
				</HStack>
				<Heading fontSize="2xl">{game.name}</Heading>
			</CardBody>
		</Card>
	);
};
