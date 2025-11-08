import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

interface BreadcrumbItem {
	label: string;
	path?: string;
}

interface Props {
	items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: Props) => {
	return (
		<Breadcrumb spacing="8px" separator={<FaChevronRight size={10} />} marginBottom={4}>
			{items.map((item, index) => {
				const isLast = index === items.length - 1;
				return (
					<BreadcrumbItem key={index} isCurrentPage={isLast}>
						{item.path && !isLast ? (
							<BreadcrumbLink as={Link} to={item.path}>
								{item.label}
							</BreadcrumbLink>
						) : (
							<BreadcrumbLink>{item.label}</BreadcrumbLink>
						)}
					</BreadcrumbItem>
				);
			})}
		</Breadcrumb>
	);
};

export default Breadcrumbs;
