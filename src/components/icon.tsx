import React from "react";
import { is } from "../shared/is";
import { IIcon } from "../shared/types";

interface IProps {
	icon?: IIcon;
	uri?: string;
}

export const Icon: React.FunctionComponent<IProps> = ({ uri, icon }) => {
	if (is.null(icon)) {
		return null;
	}

	if (!is.null(uri)) {
		return (
			<a href={uri}>
				<IconBase {...(icon as IIcon)} />
			</a>
		);
	}

	return <IconBase {...(icon as IIcon)} />;
};

const IconBase: React.FunctionComponent<IIcon> = ({ href, alt, title }) => (
	<img
		src={href}
		alt={alt}
		title={title}
		className="block w-16 h-16 rounded-2xl border border-black/5 shadow-sm overflow-hidden"
	/>
);
