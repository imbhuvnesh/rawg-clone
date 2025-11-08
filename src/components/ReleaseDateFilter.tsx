import { Box, Heading, Select, HStack } from "@chakra-ui/react";

interface Props {
	startYear: string;
	endYear: string;
	onChange: (startYear: string, endYear: string) => void;
}

const ReleaseDateFilter = ({ startYear, endYear, onChange }: Props) => {
	const currentYear = new Date().getFullYear();
	const years = [];

	// Generate years from 1980 to current year + 2
	for (let year = currentYear + 2; year >= 1980; year--) {
		years.push(year.toString());
	}

	return (
		<Box>
			<Heading size="sm" marginBottom={3}>
				Release Date
			</Heading>
			<HStack spacing={2}>
				<Select
					placeholder="From"
					value={startYear}
					onChange={(e) => onChange(e.target.value, endYear)}
					size="sm">
					{years.map((year) => (
						<option key={`start-${year}`} value={year}>
							{year}
						</option>
					))}
				</Select>
				<Select
					placeholder="To"
					value={endYear}
					onChange={(e) => onChange(startYear, e.target.value)}
					size="sm">
					{years.map((year) => (
						<option key={`end-${year}`} value={year}>
							{year}
						</option>
					))}
				</Select>
			</HStack>
		</Box>
	);
};

export default ReleaseDateFilter;
