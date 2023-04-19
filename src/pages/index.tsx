import React from "react";

interface IProps {
	title?: string;
	icon?: string;
}

export const IndexPage: React.FunctionComponent<IProps> = ({ icon, title }) => {
	return <p>Hello there</p>;
};
