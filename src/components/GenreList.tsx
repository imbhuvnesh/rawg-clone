import { Button, HStack, Image, List, ListItem, Text } from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImgUrl from "../services/image-url";
import { GenreListSkeleton } from "./GenreListSkeleton";

interface Props {
	onSelectGenre: (genre: Genre) => void;
}

export const GenreList = ({ onSelectGenre }: Props) => {
	const { data, isLoading } = useGenres();
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

	if (isLoading) {
		return (
			<List>
				{skeletons.map((skeleton) => (
					<GenreListSkeleton key={skeleton} />
				))}
			</List>
		);
	}
	return (
		<List>
			{data.map((genre) => (
				<ListItem key={genre.id} paddingY="5px">
					<HStack spacing={4}>
						<Image src={getCroppedImgUrl(genre.image_background)} boxSize="32px" borderRadius={8} />
						<Button
							fontSize="14px"
							fontWeight="bold"
							textAlign="left"
							variant="link"
							onClick={() => onSelectGenre(genre)}>
							{genre.name}
						</Button>
					</HStack>
				</ListItem>
			))}
		</List>
	);
};
