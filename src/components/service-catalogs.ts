import { is } from "../shared/is";
import { IServiceCategory } from "../shared/types";
import { CATEGORIES } from "../variables";
import { Services } from "./services";

interface IProps {
	categories: IServiceCategory[];
}

export const ServiceCatalogList = function (props: IProps) {
	const { categories } = props;

	return `
		<ul>
			${categories.map(category => ServiceCatalog({ category })).join("")}
		</ul>
	`;
};

interface ICatalogProps {
	category: IServiceCategory;
}

const ServiceCatalog = function (props: ICatalogProps) {
	const { category } = props;

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

	if (category.bubble) {
		liClassName += " var-category-bubble-bg rounded-2xl px-6 py-6 ring-1 ring-slate-900/5 shadow-xl";

		if (!is.null(category.bubbleBGLight)) {
			liClassName += ` !bg-${category.bubbleBGLight}`;
		}

		if (!is.null(category.bubbleBGDark)) {
			liClassName += ` dark:!bg-${category.bubbleBGDark}`;
		}
	}

	return `
		<li class="${liClassName}">
			<h2 class="${categoryClassName}">${category.category}</h2>
			${Services({ services: category.services, categoryBubblePadding: category.iconBubblePadding })}
		</li>
	`;
};
