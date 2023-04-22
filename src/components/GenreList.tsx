import { Button, HStack, Heading, Image, List, ListItem, useColorMode } from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImgUrl from "../services/image-url";
import { GenreListSkeleton } from "./GenreListSkeleton";

interface Props {
	onSelectGenre: (genre: Genre) => void;
	selectedGenre: Genre | null;
}

export const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
	const { data, isLoading } = useGenres();
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
	const { colorMode } = useColorMode();

	if (isLoading) {
		return (
			<>
				<Heading fontSize="2xl" marginBottom={3}>
					Genres
				</Heading>
				<List>
					{skeletons.map((skeleton) => (
						<GenreListSkeleton key={skeleton} />
					))}
				</List>
			</>
		);
	}
	return (
		<>
			<Heading fontSize="2xl" marginBottom={3}>
				Genres
			</Heading>
			<List>
				{data.map((genre) => (
					<ListItem key={genre.id} paddingY="5px">
						<HStack spacing={4}>
							<Image objectFit="cover" src={getCroppedImgUrl(genre.image_background)} boxSize="32px" borderRadius={8} />
							<Button
								fontSize="lg"
								fontWeight={genre.id === selectedGenre?.id ? "bold" : "semibold"}
								color={genre.id === selectedGenre?.id ? (colorMode === "dark" ? "white" : "gray.700") : "gray.500"}
								textAlign="left"
								whiteSpace="normal"
								variant="link"
								onClick={() => onSelectGenre(genre)}>
								{genre.name}
							</Button>
						</HStack>
					</ListItem>
				))}
			</List>
		</>
	);
};
