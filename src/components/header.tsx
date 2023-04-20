import React from "react";
import { is } from "../shared/is";

interface IProps {
	title?: string;
	icon?: string;
}

export const Header: React.FunctionComponent<IProps> = ({ icon, title }) => {
	return (
		<div className="p-2 xl:p-4 flex flex-wrap justify-center">
			{!is.null(icon) && (
				<div className="basis-full text-center">
					<img src={icon} alt={title} className="inline-block w-16 h-16" />
				</div>
			)}
			<h1 className="basis-full text-center">{title}</h1>
		</div>
	);
};
