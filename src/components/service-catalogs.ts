import { is } from "../shared/is";
import { IServiceCatalog } from "../shared/types";
import { CATEGORIES } from "../variables";
import { Services } from "./services";

interface IProps {
	catalogs: IServiceCatalog[];
}

export const ServiceCatalogList = function (props: IProps) {
	const { catalogs } = props;

	return `
		<ul>
			${catalogs.map(catalog => ServiceCatalog({ catalog })).join("")}
		</ul>
	`;
};

interface ICatalogProps {
	catalog: IServiceCatalog;
}

const ServiceCatalog = function (props: ICatalogProps) {
	const { catalog } = props;

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
		liClassName += " var-category-bubble-bg rounded-2xl px-6 py-6 ring-1 ring-slate-900/5 shadow-xl";

		if (!is.null(catalog.bubbleBGLight)) {
			liClassName += ` !bg-${catalog.bubbleBGLight}`;
		}

		if (!is.null(catalog.bubbleBGDark)) {
			liClassName += ` dark:!bg-${catalog.bubbleBGDark}`;
		}
	}

	return `
		<li class="${liClassName}">
			<h2 class="${categoryClassName}">${catalog.category}</h2>
			${Services({ services: catalog.services, categoryBubblePadding: catalog.iconBubblePadding || false })}
		</li>
	`;
};
