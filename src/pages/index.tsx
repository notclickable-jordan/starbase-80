import React from "react";
import { Header } from "../components/header";
import { ServiceCatalogList } from "../components/service-catalogs";
import userServices from "../config.json";
import { IServiceCatalog } from "../shared/types";
import { SHOWHEADER, SHOWHEADERLINE, SHOWHEADERTOP } from "../variables";

interface IProps {
	title?: string;
	icon?: string;
}

export const IndexPage: React.FunctionComponent<IProps> = ({ icon, title }) => {
	const mySerices = userServices as IServiceCatalog[];

	let headerClassName = "p-4";

	if (SHOWHEADERTOP) {
		headerClassName += " w-full";
	} else {
		headerClassName += " w-full xl:w-auto xl:max-w-xs xl:min-h-screen";
	}

	if (SHOWHEADERLINE) {
		headerClassName += "border-0 border-solid border-gray-300 dark:border-gray-700";

		if (SHOWHEADERTOP) {
			headerClassName += " border-b";
		} else {
			headerClassName += " border-b xl:border-r xl:border-b-0";
		}
	}

	let pageWrapperClassName = "min-h-screen flex flex-col  max-w-screen-2xl mx-auto";

	if (!SHOWHEADERTOP) {
		pageWrapperClassName += " xl:flex-row";
	}

	let serviceCatalogListWrapperClassName = "p-4 flex-grow";

	if (!SHOWHEADERTOP) {
		serviceCatalogListWrapperClassName += " min-h-screen";
	}

	return (
		<div className="min-h-screen">
			<div className={pageWrapperClassName}>
				{SHOWHEADER && (
					<div className={headerClassName}>
						<Header title={title} icon={icon} />
					</div>
				)}
				<div className={serviceCatalogListWrapperClassName}>
					<ServiceCatalogList catalogs={mySerices} />
				</div>
			</div>
		</div>
	);
};
