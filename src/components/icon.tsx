import React from "react";
import { is } from "../shared/is";
import { IIcon } from "../shared/types";

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
	icon?: IIcon;
	uri?: string;
}

export const Icon: React.FunctionComponent<IProps> = ({ uri, icon, index }) => {
	if (is.null(icon)) {
		return <IconBlank index={index} />;
	}

	if (!is.null(uri)) {
		return (
			<a href={uri}>
				<IconBase icon={icon as IIcon} index={index} />
			</a>
		);
	}

	return <IconBase icon={icon as IIcon} index={index} />;
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
	icon: IIcon;
	index: number;
}

const IconBase: React.FunctionComponent<IIconBaseProps> = ({ icon, index }) => {
	const { href, alt, title } = icon;

	return (
		<img
			src={href}
			alt={alt}
			title={title}
			className=" block w-16 h-16 rounded-2xl border border-black/5 shadow-sm overflow-hidden"
		/>
	);
};
