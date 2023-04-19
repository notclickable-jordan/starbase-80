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
		<div className="screen-h flex flex-row">
			<div className="border-0 border-solid border-l border-l-border p-4">
				<Header title={title} icon={icon} />
			</div>
			<div className="p-4">
				<Services services={FAKE_SERVICES} />
			</div>
		</div>
	);
};
