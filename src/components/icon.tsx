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

enum IconType {
	uri,
	material,
	dashboard,
}

interface IIconBaseProps {
	icon: string;
	iconColor?: string;
	iconBG?: string;
	iconBubble?: boolean;
}

const IconBase: React.FunctionComponent<IIconBaseProps> = ({ icon, iconBG, iconBubble, iconColor }) => {
	let iconType: IconType = IconType.uri;

	if (icon.startsWith("http") || icon.startsWith("/")) {
		iconType = IconType.uri;
	} else if (icon.startsWith("mdi-")) {
		iconType = IconType.material;
	} else {
		iconType = IconType.dashboard;
	}

	// Everyone starts the same size
	let iconClassName = "block w-16 h-16 overflow-hidden bg-contain";

	if (is.null(iconBubble) || iconBubble !== false) {
		iconClassName += " rounded-2xl border border-black/5 shadow-sm";
	}

	switch (iconType) {
		case IconType.uri:
		case IconType.dashboard:
			// Default to bubble and no background for URI and Dashboard icons
			if (!is.null(iconBG)) {
				iconClassName += ` bg-${iconBG}`;
			}
			break;
		case IconType.material:
			// Material icons get a color and a background by default, then an optional bubble
			if (is.null(iconBG)) {
				iconClassName += ` bg-slate-200`;
			} else {
				iconClassName += ` bg-${iconBG}`;
			}

			if (is.null(iconBubble) || iconBubble !== false) {
				iconClassName += " rounded-2xl border border-black/5 shadow-sm";
			}

			if (is.null(iconColor)) {
				iconColor = "black";
			}
			break;
	}

	switch (iconType) {
		case IconType.uri:
			return <img src={icon} alt="" className={iconClassName} />;
		case IconType.dashboard:
			icon = icon.replace(".png", "").replace(".jpg", "").replace(".svg", "");
			return (
				<img
					src={`https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/${icon}.png`}
					alt=""
					className={iconClassName}
				/>
			);
		case IconType.material:
			icon = icon.replace("mdi-", "").replace(".svg", "");

			return (
				<div className={iconClassName}>
					<div
						className={`block w-16 h-16 bg-${iconColor} overflow-hidden`}
						style={{
							mask: `url(https://cdn.jsdelivr.net/npm/@mdi/svg@latest/svg/${icon}.svg) no-repeat center / contain`,
							WebkitMask: `url(https://cdn.jsdelivr.net/npm/@mdi/svg@latest/svg/${icon}.svg) no-repeat center / contain`,
						}}
					/>
				</div>
			);
	}
};
