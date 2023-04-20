import React from "react";
import { is } from "../shared/is";
import { IService } from "../shared/types";
import { Icon } from "./icon";

interface IProps {
	services: IService[];
}

export const Services: React.FunctionComponent<IProps> = ({ services }) => {
	return (
		<ul className="grid grid-cols-5 gap-4">
			{services.map((service, index) => (
				<Service key={index} {...service} />
			))}
		</ul>
	);
};

const Service: React.FunctionComponent<IService> = ({ name, uri, description, icon }) => {
	return (
		<li className="p-4 flex flex-col items-center">
			{!is.null(icon) && <Icon icon={icon} uri={uri} />}
			<h3 className="text-lg font-semibold line-clamp-1 mt-1">
				<a href={uri}>{name}</a>
			</h3>
			{!is.null(description) && (
				<p className="text-sm text-black/50">
					<a href={uri}>{description}</a>
				</p>
			)}
		</li>
	);
};
