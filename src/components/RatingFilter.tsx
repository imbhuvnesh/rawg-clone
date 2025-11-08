import { Box, Heading, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Text, HStack } from "@chakra-ui/react";

interface Props {
	minRating: number;
	maxRating: number;
	onChange: (min: number, max: number) => void;
}

const RatingFilter = ({ minRating, maxRating, onChange }: Props) => {
	return (
		<Box>
			<Heading size="sm" marginBottom={3}>
				Rating Range
			</Heading>
			<HStack justifyContent="space-between" marginBottom={2}>
				<Text fontSize="sm" color="gray.500">
					{minRating}
				</Text>
				<Text fontSize="sm" color="gray.500">
					{maxRating}
				</Text>
			</HStack>
			<RangeSlider
				defaultValue={[minRating, maxRating]}
				min={0}
				max={5}
				step={0.5}
				onChangeEnd={(val) => onChange(val[0], val[1])}
				marginBottom={2}>
				<RangeSliderTrack>
					<RangeSliderFilledTrack />
				</RangeSliderTrack>
				<RangeSliderThumb index={0} />
				<RangeSliderThumb index={1} />
			</RangeSlider>
		</Box>
	);
};

export default RatingFilter;
