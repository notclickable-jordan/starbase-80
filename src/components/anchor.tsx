import React from "react";
import { is } from "../shared/is";
import { NEWWINDOW } from "../variables";

interface IProps {
	uri: string;
	title?: string;
	className?: string;
	children?: React.ReactNode;
	newWindow?: boolean;
}

export const Anchor: React.FunctionComponent<IProps> = ({ uri, children, title, className, newWindow }) => {
	let newWindowLocal = NEWWINDOW;

	if (!is.null(newWindow)) {
		newWindowLocal = newWindow as boolean;
	}

	if (newWindowLocal) {
		return (
			<a href={uri} target="_blank" rel="noreffer" title={title} className={className}>
				{children}
			</a>
		);
	}

	return (
		<a href={uri} title={title} className={className}>
			{children}
		</a>
	);
};
