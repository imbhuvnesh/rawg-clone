import { HStack, Image, IconButton, Badge, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { useFavoritesContext } from "../contexts/FavoritesContext";

interface Props {
	onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
	const { favorites } = useFavoritesContext();

	return (
		<HStack padding="10px" spacing={4}>
			<Image as={Link} to="/" src={logo} boxSize="60px" cursor="pointer" />
			<SearchInput onSearch={onSearch} />
			<Box position="relative">
				<IconButton
					as={Link}
					to="/favorites"
					aria-label="View favorites"
					icon={<FaHeart />}
					colorScheme="red"
					variant="ghost"
					size="md"
				/>
				{favorites.length > 0 && (
					<Badge
						position="absolute"
						top="-1"
						right="-1"
						colorScheme="red"
						borderRadius="full"
						fontSize="xs"
						minW="20px"
						textAlign="center">
						{favorites.length}
					</Badge>
				)}
			</Box>
			<ColorModeSwitch />
		</HStack>
	);
};

export default NavBar;
