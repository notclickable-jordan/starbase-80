import React from "react";
import { IServiceCatalog } from "../shared/types";
import { Services } from "./services";

interface IProps {
	catalogs: IServiceCatalog[];
}

export const ServiceCatalogs: React.FunctionComponent<IProps> = ({ catalogs }) => {
	return (
		<ul>
			{catalogs.map((catalog, index) => (
				<li key={index} className="mt-12 first:mt-0 xl:first:mt-6">
					<h2 className="text-2xl text-slate-600 font-light py-2 px-4">{catalog.category}</h2>
					<Services services={catalog.services} />
				</li>
			))}
		</ul>
	);
};
