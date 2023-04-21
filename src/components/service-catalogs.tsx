import React from "react";
import { IServiceCatalog } from "../shared/types";
import { CATEGORIES } from "../variables";
import { Services } from "./services";

interface IProps {
	catalogs: IServiceCatalog[];
}

export const ServiceCatalogList: React.FunctionComponent<IProps> = ({ catalogs }) => {
	return (
		<ul>
			{catalogs.map((catalog, index) => (
				<ServiceCatalog key={index} catalog={catalog} index={index} />
			))}
		</ul>
	);
};

interface ICatalogProps {
	catalog: IServiceCatalog;
	index: number;
}

const ServiceCatalog: React.FunctionComponent<ICatalogProps> = ({ catalog, index }) => {
	let categoryClassName = "dark:text-slate-200";

	switch (CATEGORIES as string) {
		case "small":
			categoryClassName += " text-sm text-slate-800 font-semibold py px-4 uppercase";
			break;
		case "normal":
		default:
			categoryClassName += " text-2xl text-slate-600 font-light py-2 px-4";
			break;
	}

	let liClassName = "mt-12 first:mt-0 xl:first:mt-6";

	if (catalog.bubble) {
		liClassName += " bg-white dark:bg-black rounded-2xl px-6 py-6 ring-1 ring-slate-900/5 shadow-xl";
	}

	return (
		<li key={index} className={liClassName}>
			<h2 className={categoryClassName}>{catalog.category}</h2>
			<Services services={catalog.services} />
		</li>
	);
};
