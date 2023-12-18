import { is } from "../shared/is";

interface IProps {
	title?: string;
	icon?: string;
}

export const Header = function (props: IProps) {
	const { icon, title } = props;
	return `
		<div class="p-2 xl:p-4 flex flex-nowrap justify-center items-center gap-2 xl:flex-wrap">
			${!is.null(icon) && `<img src="${icon}" alt="${title || ""}" class="inline-block w-16 h-16" />`}
			<h1>${title}</h1>
		</div>
	`;
};
