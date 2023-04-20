import React from "react";
import userServices from "../../public/services.json";
import { Header } from "../components/header";
import { Services } from "../components/services";
import { IService } from "../shared/types";

interface IProps {
	title?: string;
	icon?: string;
}

export const IndexPage: React.FunctionComponent<IProps> = ({ icon, title }) => {
	const mySerices = userServices as IService[];

	return (
		<div className="min-h-screen flex flex-col xl:flex-row">
			<div className="w-full xl:w-auto xl:max-w-xs xl:min-h-screen border-0 border-solid border-b xl:border-r xl:border-b-0 border-gray-300 p-4">
				<Header title={title} icon={icon} />
			</div>
			<div className="min-h-screen p-4 flex-grow">
				<Services services={mySerices} />
			</div>
		</div>
	);
};
