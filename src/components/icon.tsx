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
	name: string;
	index: number;
	icon?: string;
	iconColor?: string;
	iconBG?: string;
	iconBubble?: boolean;
	uri?: string;
}

export const Icon: React.FunctionComponent<IProps> = ({ name, uri, icon, index, iconBG, iconBubble, iconColor }) => {
	if (is.null(icon)) {
		if (!is.null(uri)) {
			return (
				<a href={uri} target="_blank" rel="noreferrer" title={name}>
					<IconBlank index={index} />
				</a>
			);
		}

		return <IconBlank index={index} />;
	}

	if (!is.null(uri)) {
		return (
			<a href={uri} target="_blank" rel="noreferrer" title={name}>
				<IconBase icon={icon as string} iconBG={iconBG} iconColor={iconColor} iconBubble={iconBubble} />
			</a>
		);
	}

	return <IconBase icon={icon as string} iconBG={iconBG} iconColor={iconColor} iconBubble={iconBubble} />;
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
	iconColor?: string;
	iconBG?: string;
	iconBubble?: boolean;
}

const IconBase: React.FunctionComponent<IIconBaseProps> = ({ icon, iconBG, iconBubble, iconColor }) => {
	if (icon.startsWith("http") || icon.startsWith("/")) {
		/* Relative or absolute icon URI */
		return (
			<img
				src={icon}
				alt=""
				className=" block w-16 h-16 rounded-2xl border border-black/5 shadow-sm overflow-hidden"
			/>
		);
	}

	if (icon.startsWith("mdi-")) {
		/* Material Design icon */
		const iconName = icon.replace("mdi-", "").replace(".svg", "");
		let iconClassName =
			iconBubble === false
				? "block w-16 h-16 overflow-hidden"
				: "block w-16 h-16 rounded-2xl border border-black/5 shadow-sm overflow-hidden";

		if (is.null(iconBG)) {
			iconClassName += ` bg-slate-200`;
		} else {
			iconClassName += ` bg-${iconBG}`;
		}

		return (
			<div className={iconClassName}>
				<div
					className={`block w-16 h-16 bg-${iconColor} overflow-hidden`}
					style={{
						mask: `url(https://cdn.jsdelivr.net/npm/@mdi/svg@latest/svg/${iconName}.svg) no-repeat center / contain`,
						WebkitMask: `url(https://cdn.jsdelivr.net/npm/@mdi/svg@latest/svg/${iconName}.svg) no-repeat center / contain`,
					}}
				/>
			</div>
		);
	}

	/* Dashboard icon */
	const iconName = icon.replace(".png", "").replace(".jpg", "").replace(".svg", "");
	return (
		<img
			src={`https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/${iconName}.png`}
			alt=""
			className="block w-16 h-16 rounded-2xl border border-black/5 shadow-sm overflow-hidden"
		/>
	);
};
