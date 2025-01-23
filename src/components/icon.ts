import { is } from "../shared/is";
import { IconAspect } from "../shared/types";
import { Anchor } from "./anchor";

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
	iconBubblePadding?: boolean;
	iconAspect?: IconAspect;
	uri?: string;
	newWindow?: boolean;
	categoryBubblePadding?: boolean;
}

export const Icon = function (props: IProps): string {
	const {
		name,
		uri,
		icon,
		index,
		iconBG,
		iconBubble,
		iconBubblePadding,
		iconColor,
		iconAspect,
		newWindow,
		categoryBubblePadding,
	} = props;

	if (is.null(icon)) {
		if (!is.null(uri)) {
			return Anchor({ uri: uri as string, title: name, newWindow, children: IconBlank({ index }) });
		}

		return IconBlank({ index });
	}

	let bubblePadding = categoryBubblePadding || false;

	if (iconBubblePadding === true) {
		bubblePadding = true;
	} else if (iconBubblePadding === false) {
		bubblePadding = false;
	}

	return IconBase({
		icon: icon as string,
		iconBG,
		iconColor,
		iconBubble,
		iconBubblePadding: bubblePadding,
		iconAspect,
	});
};

interface IIconBlankProps {
	index: number;
}

function IconBlank(props: IIconBlankProps) {
	const { index } = props;
	return `
		<span
			class="${`block w-16 h-16 rounded-2xl border border-black/5 shadow-sm ${getIconColor(index)} overflow-hidden`}"
		/>
	`;
}

enum IconType {
	uri,
	material,
	dashboard,
	selfhst,
}

interface IIconBaseProps {
	icon: string;
	iconColor?: string;
	iconBG?: string;
	iconBubble?: boolean;
	iconBubblePadding?: boolean;
	iconAspect?: IconAspect;
}

function IconBase(props: IIconBaseProps) {
	let { icon, iconBG, iconBubble, iconBubblePadding, iconColor, iconAspect = "square" } = props;

	let iconType: IconType = IconType.uri;

	if (icon.startsWith("http") || icon.startsWith("/")) {
		iconType = IconType.uri;
	} else if (icon.startsWith("mdi-")) {
		iconType = IconType.material;
	} else if (icon.startsWith("selfhst-")) {
		iconType = IconType.selfhst;
	} else {
		iconType = IconType.dashboard;
	}

	// Everyone starts the same size
	let bubbleClassName = "flex items-center justify-center overflow-hidden bg-contain object-contain";
	let iconWrapperWidthHeightClassName = "";
	let iconItselfWidthHeightClassName = "";

	switch (iconAspect) {
		case "width":
			iconItselfWidthHeightClassName = "w-16";
			iconWrapperWidthHeightClassName += " w-16";

			if (iconBubblePadding) {
				iconItselfWidthHeightClassName = "w-14";
			}
			break;
		case "height":
			iconItselfWidthHeightClassName = "h-16";
			iconWrapperWidthHeightClassName += " h-16";

			if (iconBubblePadding) {
				iconItselfWidthHeightClassName = "h-14";
			}
			break;
		case "square":
		default:
			iconItselfWidthHeightClassName = "w-16 h-16";
			iconWrapperWidthHeightClassName += " w-16 h-16";

			if (iconBubblePadding) {
				iconItselfWidthHeightClassName = "w-14 h-14";
			}
			break;
	}

	bubbleClassName += iconWrapperWidthHeightClassName;

	if (is.null(iconBubble) || iconBubble !== false) {
		bubbleClassName += " rounded-2xl border border-black/5 shadow-sm";
	}

	const bubbleStyle: string[] = [];

	switch (iconType) {
		case IconType.uri:
		case IconType.dashboard:
		case IconType.selfhst:
			// Default to bubble and no background for URI, Dashboard and selfhst icons
			if (!is.null(iconBG)) {
				if (iconBG?.startsWith("#")) {
					bubbleStyle.push(`background-color: ${iconBG}`);
				} else {
					bubbleClassName += ` bg-${iconBG}`;
				}
			}
			break;
		case IconType.material:
			// Material icons get a color and a background by default, then an optional bubble
			if (is.null(iconBG)) {
				bubbleClassName += ` bg-slate-200 dark:bg-gray-900`;
			} else {
				if (iconBG?.startsWith("#")) {
					bubbleStyle.push(`background-color: ${iconBG}`);
				} else {
					bubbleClassName += ` bg-${iconBG}`;
				}
			}

			if (is.null(iconColor)) {
				iconColor = "black dark:bg-white";
			}
			break;
	}

	const mdiIconStyle: string[] = [];
	let mdiIconColorFull = "bg-" + iconColor;

	if (!is.null(iconColor) && iconColor?.startsWith("#")) {
		mdiIconColorFull = "";
		mdiIconStyle.push(`background-color: ${iconColor}`);
	}

	switch (iconType) {
		case IconType.uri:
			return `<span class="${bubbleClassName}" style="${unwrapStyles(
				bubbleStyle
			)}"><img src="${icon}" alt="" class="${iconItselfWidthHeightClassName || ""}" /></span>`;
		case IconType.dashboard:
			icon = icon.replace(".png", "").replace(".jpg", "").replace(".svg", "");
			return `<span class="${bubbleClassName}" style="${unwrapStyles(bubbleStyle)}">
				<img
					src=${`https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/${icon}.png`}
					alt=""
					class="${iconItselfWidthHeightClassName || ""}"
				/>
			</span>`;
		case IconType.selfhst:
			icon = icon.replace("selfhst-", "").replace(".png", "").replace(".svg", "");
			return `<span class="${bubbleClassName}" style="${unwrapStyles(bubbleStyle)}">
				<img
					src=${`https://cdn.jsdelivr.net/gh/selfhst/icons/png/${icon}.png`}
					alt=""
					class="${iconItselfWidthHeightClassName || ""}"
				/>
			</span>`;
		case IconType.material:
			icon = icon.replace("mdi-", "").replace(".svg", "");
			return `
			<span class="${bubbleClassName}" style="${unwrapStyles(bubbleStyle)}">
				<span>
					<span
						class="flex items-center justify-center ${iconItselfWidthHeightClassName} ${mdiIconColorFull} overflow-hidden"
						style="${unwrapStyles(
							mdiIconStyle.concat([
								`mask: url(https://cdn.jsdelivr.net/npm/@mdi/svg@latest/svg/${icon}.svg) no-repeat center / contain`,
								`webkit-mask: url(https://cdn.jsdelivr.net/npm/@mdi/svg@latest/svg/${icon}.svg) no-repeat center / contain`,
							])
						)}"
					></span>
				</span>
				</span>
			`;
	}
}

function unwrapStyles(styles: string[]): string {
	if (is.null(styles)) {
		return "";
	}

	return styles.join(";");
}
