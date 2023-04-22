import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { Platform } from "../hooks/useGames";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib/esm/iconBase";

interface Props {
	platforms: Platform[];
}

export const PlatformIconsList = ({ platforms }: Props) => {
	const iconMap: { [key: string]: IconType } = {
		pc: FaWindows,
		playstation: FaPlaystation,
		xbox: FaXbox,
		linux: FaLinux,
		mac: FaApple,
		android: FaAndroid,
		nintendo: SiNintendo,
		ios: MdPhoneIphone,
		web: BsGlobe,
	};
	return (
		<HStack marginY={1}>
			{platforms.map((platform) => (
				<>
					<Icon as={iconMap[platform.slug]} color={"gray.500"} />
				</>
			))}
		</HStack>
	);
};
