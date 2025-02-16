import { is } from "../shared/is";
import { NEWWINDOW } from "../variables";

interface IProps {
	uri: string;
	title?: string;
	className?: string;
	children?: any;
	newWindow?: boolean;
}

export const Anchor = function (props: IProps) {
	const { uri, children, title, className, newWindow } = props;

	let newWindowLocal = NEWWINDOW;

	if (!is.null(newWindow)) {
		newWindowLocal = newWindow as boolean;
	}

	if (newWindowLocal) {
		return `
			<a href="${uri}" target="_blank" rel="noopener noreferrer" title="${title || ""}" class="${className || ""}">
				${children}
			</a>
		`;
	}

	return `
		<a href="${uri}" title="${title || ""}" class="${className || ""}">
			${children}
		</a>
	`;
};
