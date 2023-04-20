import React from "react";
import { is } from "../shared/is";

const iconColors = [
	"blue",
	"rose",
	"green",
	"red",
	"yellow",
	"cyan",
	"pink",
	"orange",
	"sky",
	"slate",
	"emerald",
	"zinc",
	"neutral",
	"amber",
	"violet",
];
const iconLevel = 300;

const getIconColor = (index: number) => `bg-${iconColors[iconColors.length % index]}-${iconLevel}`;

interface IProps {
	index: number;
	icon?: string;
	uri?: string;
}

export const Icon: React.FunctionComponent<IProps> = ({ uri, icon, index }) => {
	if (is.null(icon)) {
		if (!is.null(uri)) {
			return (
				<a href={uri} target="_blank">
					<IconBlank index={index} />
				</a>
			);
		}

		return <IconBlank index={index} />;
	}

	if (!is.null(uri)) {
		return (
			<a href={uri} target="_blank">
				<IconBase icon={icon as string} />
			</a>
		);
	}

	return <IconBase icon={icon as string} />;
};

interface IIconBlankProps {
	index: number;
}

const IconBlank: React.FunctionComponent<IIconBlankProps> = ({ index }) => {
	return (
		<span
			className={`block w-16 h-16 rounded-2xl border border-black/5 shadow-sm ${getIconColor(
				index
			)} overflow-hidden`}
		/>
	);
};

interface IIconBaseProps {
	icon: string;
}

const IconBase: React.FunctionComponent<IIconBaseProps> = ({ icon }) => {
	return (
		<img
			src={icon}
			alt=""
			className=" block w-16 h-16 rounded-2xl border border-black/5 shadow-sm overflow-hidden"
		/>
	);
};
