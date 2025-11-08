import { Box, VStack, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";
import RatingFilter from "./RatingFilter";
import ReleaseDateFilter from "./ReleaseDateFilter";

interface Props {
	minRating: number;
	maxRating: number;
	startYear: string;
	endYear: string;
	onRatingChange: (min: number, max: number) => void;
	onDateChange: (startYear: string, endYear: string) => void;
	onClearFilters: () => void;
}

const FilterPanel = ({ minRating, maxRating, startYear, endYear, onRatingChange, onDateChange, onClearFilters }: Props) => {
	const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });

	const hasActiveFilters = minRating > 0 || maxRating < 5 || startYear || endYear;

	return (
		<Box marginBottom={5} paddingX={2}>
			<Button
				leftIcon={<FaFilter />}
				rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
				onClick={onToggle}
				variant="outline"
				size="md"
				width={{ base: "100%", md: "auto" }}
				colorScheme={hasActiveFilters ? "blue" : "gray"}>
				{hasActiveFilters ? "Filters (Active)" : "More Filters"}
			</Button>

			<Collapse in={isOpen} animateOpacity>
				<Box padding={4} borderWidth={1} borderRadius="md" marginTop={3}>
					<VStack spacing={6} align="stretch">
						<RatingFilter minRating={minRating} maxRating={maxRating} onChange={onRatingChange} />
						<ReleaseDateFilter startYear={startYear} endYear={endYear} onChange={onDateChange} />
						{hasActiveFilters && (
							<Button onClick={onClearFilters} variant="outline" colorScheme="red" size="sm">
								Clear All Filters
							</Button>
						)}
					</VStack>
				</Box>
			</Collapse>
		</Box>
	);
};

export default FilterPanel;
