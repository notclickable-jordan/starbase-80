import React from "react";
import { NEWWINDOW } from "../variables";

interface IProps {
	uri: string;
	title?: string;
	className?: string;
	children?: React.ReactNode;
}

export const Anchor: React.FunctionComponent<IProps> = ({ uri, children, title, className }) => {
	if (NEWWINDOW) {
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
