import React from "react";
import { Header } from "../components/header";
import { ServiceCatalogList } from "../components/service-catalogs";
import userServices from "../config.json";
import { IServiceCatalog } from "../shared/types";
import { SHOWHEADER, SHOWHEADERLINE } from "../variables";

interface IProps {
	title?: string;
	icon?: string;
}

export const IndexPage: React.FunctionComponent<IProps> = ({ icon, title }) => {
	const mySerices = userServices as IServiceCatalog[];

	let headerClassName = "w-full xl:w-auto xl:max-w-xs xl:min-h-screen p-4";

	if (SHOWHEADERLINE) {
		headerClassName +=
			"border-0 border-solid border-b xl:border-r xl:border-b-0 border-gray-300 dark:border-gray-700";
	}

	return (
		<div className="min-h-screen">
			<div className="min-h-screen flex flex-col xl:flex-row max-w-screen-2xl mx-auto">
				{SHOWHEADER && (
					<div className={headerClassName}>
						<Header title={title} icon={icon} />
					</div>
				)}
				<div className="min-h-screen p-4 flex-grow">
					<ServiceCatalogList catalogs={mySerices} />
				</div>
			</div>
		</div>
	);
};
