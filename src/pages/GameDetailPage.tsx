import { useParams } from "react-router-dom";
import {
	Box,
	Heading,
	Text,
	Image,
	SimpleGrid,
	Spinner,
	Badge,
	HStack,
	VStack,
	GridItem,
	Grid,
	Container,
} from "@chakra-ui/react";
import useGameDetails from "../hooks/useGameDetails";
import useGameScreenshots from "../hooks/useGameScreenshots";
import getCroppedImgUrl from "../services/image-url";
import { PlatformIconsList } from "../components/PlatformIconsList";
import { CriticScore } from "../components/CriticScore";

const GameDetailPage = () => {
	const { id } = useParams();
	const { data: game, error, isLoading } = useGameDetails(id || "");
	const { data: screenshots } = useGameScreenshots(id || "");

	if (!id) {
		return (
			<Box padding={10}>
				<Text>Invalid game ID</Text>
			</Box>
		);
	}

	if (isLoading) {
		return (
			<Box padding={10} display="flex" justifyContent="center">
				<Spinner size="xl" />
			</Box>
		);
	}

	if (error || !game) {
		return (
			<Box padding={10}>
				<Text>Error loading game details: {error}</Text>
			</Box>
		);
	}

	return (
		<Container maxW="container.xl" padding={5}>
			<VStack spacing={6} align="stretch">
				{/* Header Section */}
				<Box>
					<Heading as="h1" size="2xl" marginBottom={4}>
						{game.name}
					</Heading>
					<HStack spacing={4} marginBottom={4}>
						<PlatformIconsList platforms={game.parent_platforms.map((p) => p.platform)} />
						<CriticScore score={game.metacritic} />
					</HStack>
				</Box>

				{/* Main Image */}
				{game.background_image && (
					<Image src={getCroppedImgUrl(game.background_image)} borderRadius="lg" width="100%" maxH="500px" objectFit="cover" />
				)}

				{/* Game Info Grid */}
				<Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
					<GridItem>
						{/* Description */}
						<Box marginBottom={6}>
							<Heading size="md" marginBottom={3}>
								About
							</Heading>
							<Text whiteSpace="pre-line">{game.description_raw}</Text>
						</Box>

						{/* Screenshots */}
						{screenshots.length > 0 && (
							<Box>
								<Heading size="md" marginBottom={3}>
									Screenshots
								</Heading>
								<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
									{screenshots.map((screenshot) => (
										<Image
											key={screenshot.id}
											src={screenshot.image}
											borderRadius="md"
											objectFit="cover"
											height="200px"
											width="100%"
										/>
									))}
								</SimpleGrid>
							</Box>
						)}
					</GridItem>

					<GridItem>
						{/* Game Details */}
						<VStack align="stretch" spacing={4}>
							{/* Release Date */}
							<Box>
								<Heading size="sm" marginBottom={2}>
									Release Date
								</Heading>
								<Text>{game.released || "TBA"}</Text>
							</Box>

							{/* Developers */}
							{game.developers.length > 0 && (
								<Box>
									<Heading size="sm" marginBottom={2}>
										Developers
									</Heading>
									<HStack flexWrap="wrap">
										{game.developers.map((dev) => (
											<Badge key={dev.id} colorScheme="blue">
												{dev.name}
											</Badge>
										))}
									</HStack>
								</Box>
							)}

							{/* Publishers */}
							{game.publishers.length > 0 && (
								<Box>
									<Heading size="sm" marginBottom={2}>
										Publishers
									</Heading>
									<HStack flexWrap="wrap">
										{game.publishers.map((pub) => (
											<Badge key={pub.id} colorScheme="purple">
												{pub.name}
											</Badge>
										))}
									</HStack>
								</Box>
							)}

							{/* Genres */}
							{game.genres.length > 0 && (
								<Box>
									<Heading size="sm" marginBottom={2}>
										Genres
									</Heading>
									<HStack flexWrap="wrap">
										{game.genres.map((genre) => (
											<Badge key={genre.id} colorScheme="green">
												{genre.name}
											</Badge>
										))}
									</HStack>
								</Box>
							)}

							{/* Rating */}
							<Box>
								<Heading size="sm" marginBottom={2}>
									Rating
								</Heading>
								<Text>
									{game.rating} / {game.rating_top}
								</Text>
							</Box>

							{/* Playtime */}
							{game.playtime > 0 && (
								<Box>
									<Heading size="sm" marginBottom={2}>
										Average Playtime
									</Heading>
									<Text>{game.playtime} hours</Text>
								</Box>
							)}

							{/* Rating Distribution */}
							{game.ratings.length > 0 && (
								<Box>
									<Heading size="sm" marginBottom={2}>
										Rating Distribution
									</Heading>
									<VStack align="stretch" spacing={1}>
										{game.ratings.map((rating) => (
											<HStack key={rating.id} justifyContent="space-between">
												<Text fontSize="sm">{rating.title}</Text>
												<Text fontSize="sm" fontWeight="bold">
													{rating.percent}%
												</Text>
											</HStack>
										))}
									</VStack>
								</Box>
							)}
						</VStack>
					</GridItem>
				</Grid>
			</VStack>
		</Container>
	);
};

export default GameDetailPage;
