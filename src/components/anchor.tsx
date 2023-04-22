import React from "react";
import { NEWWINDOW } from "../variables";

interface IProps {
	uri: string;
	title?: string;
	children?: React.ReactNode;
}

export const Anchor: React.FunctionComponent<IProps> = ({ uri, children, title }) => {
	if (NEWWINDOW) {
		return (
			<a href={uri} target="_blank" rel="noreffer" title={title}>
				{children}
			</a>
		);
	}

	return (
		<a href={uri} title={title}>
			{children}
		</a>
	);
};
