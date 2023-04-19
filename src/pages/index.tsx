import React from "react";
import { Header } from "../components/header";
import { Services } from "../components/services";
import { FAKE_SERVICES } from "../shared/types";

interface IProps {
	title?: string;
	icon?: string;
}

export const IndexPage: React.FunctionComponent<IProps> = ({ icon, title }) => {
	return (
		<div className="min-h-screen flex flex-row">
			<div className="min-h-screen border-0 border-solid border-r-2 border-r-gray-300 p-4">
				<Header title={title} icon={icon} />
			</div>
			<div className="min-h-screen p-4">
				<Services services={FAKE_SERVICES} />
			</div>
		</div>
	);
};
