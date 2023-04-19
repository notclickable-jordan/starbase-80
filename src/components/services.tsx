import React from "react";
import { is } from "../shared/is";
import { IService } from "../shared/types";

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
		<li>
			<a href={uri} className="p-4 block text-center bg-gray-100">
				<h3 className="text-lg font-semibold">{name}</h3>
				{!is.null(description) && <p className="text-sm">{description}</p>}
			</a>
		</li>
	);
};
