import { HStack, Image, List, ListItem, Text } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImgUrl from "../services/image-url";
import { GenreListSkeleton } from "./GenreListSkeleton";

export const GenreList = () => {
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
					<HStack>
						<Image src={getCroppedImgUrl(genre.image_background)} boxSize="32px" borderRadius={8} />
						<Text fontSize="lg">{genre.name}</Text>
					</HStack>
				</ListItem>
			))}
		</List>
	);
};
