import React from "react";
import { IService } from "../shared/types";

interface IProps {
	services: IService[];
}

export const Services: React.FunctionComponent<IProps> = ({ services }) => {
	return (
		<ul className="grid grid-flow-col auto-cols-min gap-2">
			{services.map((service, index) => (
				<Service key={index} {...service} />
			))}
		</ul>
	);
};

const Service: React.FunctionComponent<IService> = ({ name, uri, description, icon }) => {
	return (
		<li>
			<a href={uri} className="p-4 block bg-border">
				{name}
			</a>
		</li>
	);
};
