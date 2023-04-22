import { HStack, ListItem, Skeleton, SkeletonText } from "@chakra-ui/react";

export const GenreListSkeleton = () => {
	return (
		<ListItem>
			<HStack>
				<Skeleton boxSize="32px" borderRadius={8} />
			</HStack>
			<SkeletonText />
		</ListItem>
	);
};
