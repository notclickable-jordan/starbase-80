import React from "react";
import { is } from "../shared/is";
import { IService } from "../shared/types";
import { Icon } from "./icon";

interface IServicesProps {
	services: IService[];
}

export const Services: React.FunctionComponent<IServicesProps> = ({ services }) => {
	return (
		<ul className="grid grid-cols-5 gap-4 gap-y-8">
			{services.map((service, index) => (
				<Service key={index} service={service} index={index} />
			))}
		</ul>
	);
};

interface IServiceProps {
	service: IService;
	index: number;
}

const Service: React.FunctionComponent<IServiceProps> = ({ service, index }) => {
	const { name, uri, description, icon } = service;

	return (
		<li className="p-4 flex flex-col items-center">
			<Icon icon={icon} uri={uri} index={index} />
			<h3 className="text-lg mt-1 font-semibold line-clamp-1">
				<a href={uri}>{name}</a>
			</h3>
			{!is.null(description) && (
				<p className="text-sm text-black/50 line-clamp-1">
					<a href={uri}>{description}</a>
				</p>
			)}
		</li>
	);
};
