import { is } from "../shared/is";
import { IconAspect } from "../shared/types";
import { THEME } from "../variables";
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
	iconLight?: string;
	iconDark?: string;
	iconColor?: string;
	iconBG?: string;
	iconBubble?: boolean;
	iconBubblePadding?: boolean;
	iconAspect?: IconAspect;
	uri?: string;
	newWindow?: boolean;
	categoryBubblePadding?: boolean;
	standalone?: boolean; // New prop to indicate if icon should create its own anchor
}

// Theme detection utility
function getCurrentTheme(): "light" | "dark" | "auto" {
	return THEME as "light" | "dark" | "auto";
}

// Icon selection logic
function selectIcon(icon?: string, iconLight?: string, iconDark?: string): string | null {
	const theme = getCurrentTheme();

	switch (theme) {
		case "light":
			return iconLight || icon || null;
		case "dark":
			return iconDark || icon || null;
		case "auto":
		default:
			// For auto theme, we'll handle this in the main function
			return icon || null;
	}
}

export const Icon = function (props: IProps): string {
	const {
		name,
		uri,
		icon,
		iconLight,
		iconDark,
		index,
		iconBG,
		iconBubble,
		iconBubblePadding,
		iconColor,
		iconAspect,
		newWindow,
		categoryBubblePadding,
		standalone = false,
	} = props;

	const theme = getCurrentTheme();
	let iconContent = "";

	// Handle auto theme with dual rendering
	if (theme === "auto" && (iconLight || iconDark)) {
		const lightIcon = iconLight || icon;
		const darkIcon = iconDark || icon;

		let bubblePadding = categoryBubblePadding || false;
		if (iconBubblePadding === true) {
			bubblePadding = true;
		} else if (iconBubblePadding === false) {
			bubblePadding = false;
		}

		let result = "";

		// Light theme icon
		if (lightIcon) {
			const lightIconHtml = IconBase({
				icon: lightIcon,
				iconBG,
				iconColor,
				iconBubble,
				iconBubblePadding: bubblePadding,
				iconAspect,
			});
			result += `<span class="block dark:hidden">${lightIconHtml}</span>`;
		}

		// Dark theme icon
		if (darkIcon) {
			const darkIconHtml = IconBase({
				icon: darkIcon,
				iconBG,
				iconColor,
				iconBubble,
				iconBubblePadding: bubblePadding,
				iconAspect,
			});
			result += `<span class="hidden dark:block">${darkIconHtml}</span>`;
		}

		iconContent = result || IconBlank({ index });
	} else {
		// Handle light/dark theme or fallback for auto theme
		const selectedIcon = selectIcon(icon, iconLight, iconDark);

		if (is.null(selectedIcon)) {
			iconContent = IconBlank({ index });
		} else {
			let bubblePadding = categoryBubblePadding || false;

			if (iconBubblePadding === true) {
				bubblePadding = true;
			} else if (iconBubblePadding === false) {
				bubblePadding = false;
			}

			iconContent = IconBase({
				icon: selectedIcon as string,
				iconBG,
				iconColor,
				iconBubble,
				iconBubblePadding: bubblePadding,
				iconAspect,
			});
		}
	}

	// Only wrap in Anchor component if uri is provided AND standalone is true
	// This prevents nested anchors when the icon is used within services components
	if (!is.null(uri) && standalone) {
		return Anchor({
			uri: uri as string,
			title: name,
			newWindow,
			children: iconContent,
		});
	}

	return iconContent;
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
	let bubbleClassName = "flex items-center justify-center overflow-hidden bg-contain";
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
			iconItselfWidthHeightClassName = "w-16 h-16 object-contain";
			iconWrapperWidthHeightClassName += " w-16 h-16";

			if (iconBubblePadding) {
				iconItselfWidthHeightClassName = "w-14 h-14 object-contain";
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
