import React from "react";
import { is } from "../shared/is";
import { IService } from "../shared/types";

interface IProps {
	title?: string;
	icon?: string;

	auth?: IService;
	docker?: IService;
}

export const Header: React.FunctionComponent<IProps> = ({ icon, title, auth, docker }) => {
	return (
		<div className="p-4">
			<h1>{title}</h1>
			{!is.null(icon) && <img src={icon} alt="icon" />}
		</div>
	);
};
