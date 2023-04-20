import React from "react";
import { is } from "../shared/is";

interface IProps {
	title?: string;
	icon?: string;
}

export const Header: React.FunctionComponent<IProps> = ({ icon, title }) => {
	return (
		<div className="p-2 xl:p-4 flex flex-nowrap justify-center items-center gap-2 xl:flex-wrap">
			{!is.null(icon) && <img src={icon} alt={title} className="inline-block w-16 h-16" />}
			<h1>{title}</h1>
		</div>
	);
};
