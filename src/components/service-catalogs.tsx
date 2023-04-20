import React from "react";
import { IServiceCatalog } from "../shared/types";
import { Services } from "./services";

interface IProps {
	catalogs: IServiceCatalog[];
}

export const ServiceCatalogs: React.FunctionComponent<IProps> = ({ catalogs }) => {
	return (
		<ul className="">
			{catalogs.map((catalog, index) => (
				<li key={index} className="mt-10 first:mt-0">
					<h2 className="text-2xl text-slate-800 inline-block py-2 px-4">{catalog.category}</h2>
					<Services services={catalog.services} />
				</li>
			))}
		</ul>
	);
};
