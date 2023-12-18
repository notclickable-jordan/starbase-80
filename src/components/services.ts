import { is } from "../shared/is";
import { IService } from "../shared/types";
import { Anchor } from "./anchor";
import { Icon } from "./icon";

interface IServicesProps {
	services: IService[];
}

export const Services = function (props: IServicesProps) {
	const { services } = props;

	return `
		<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 lg:gap-2 lg:gap-y-4">
			${services.map((service, index) => Service({ index, service })).join("")}
		</ul>
	`;
};

interface IServiceProps {
	service: IService;
	index: number;
}

function Service(props: IServiceProps) {
	const { service, index } = props;

	const { name, uri, description, icon, iconBG, iconBubble, iconColor, iconAspect, newWindow } = service;

	return `
		<li className="p-4 flex gap-4">
			${
				!is.null(icon) &&
				`
				<span className="flex-shrink-0 flex">
				${Icon({ name, icon, uri, index, iconColor, iconBG, iconBubble, iconAspect, newWindow })}
				</span>
			`
			}
			<div>
				<h3 className="text-lg mt-1 font-semibold line-clamp-1">
					${Anchor({ uri, newWindow, children: name })}
				</h3>
				${
					!is.null(description) &&
					`
					<p className="text-sm text-black/50 dark:text-white/50 line-clamp-1">
					${Anchor({ uri, newWindow, children: description })}
					</p>
				`
				}
			</div>
		</li>
	`;
}
