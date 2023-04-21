import React from "react";
import { IServiceCatalog } from "../shared/types";
import { CATEGORIES } from "../variables";
import { Services } from "./services";

interface IProps {
	catalogs: IServiceCatalog[];
}

export const ServiceCatalogs: React.FunctionComponent<IProps> = ({ catalogs }) => {
	let categoryClassName = "";

	switch (CATEGORIES as string) {
		case "small":
			categoryClassName = "text-sm text-slate-800 font-semibold py px-4 uppercase";
			break;
		case "normal":
		default:
			categoryClassName = "text-2xl text-slate-600 font-light py-2 px-4";
			break;
	}

	return (
		<ul>
			{catalogs.map((catalog, index) => (
				<li key={index} className="mt-12 first:mt-0 xl:first:mt-6">
					<h2 className={categoryClassName}>{catalog.category}</h2>
					<Services services={catalog.services} />
				</li>
			))}
		</ul>
	);
};
