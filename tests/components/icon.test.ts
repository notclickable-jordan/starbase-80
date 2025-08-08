import { Icon } from "../../src/components/icon";
import { IconAspect } from "../../src/shared/types";

describe("Icon Component", () => {
	const testColors = ["blue", "rose", "green", "red", "yellow"];
	const longString =
		"This is a very long service name that tests how the component handles extensive text content and ensures that it properly renders without breaking the layout or functionality";

	describe("Required props only", () => {
		test("should render with just name and index", () => {
			const result = Icon({
				name: "Test Service",
				index: 0,
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with long name", () => {
			const result = Icon({
				name: longString,
				index: 1,
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With icon variations", () => {
		test("should render with HTTP URL icon", () => {
			const result = Icon({
				name: "External Service",
				index: 0,
				icon: "https://example.com/icon.png",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with local path icon", () => {
			const result = Icon({
				name: "Local Service",
				index: 1,
				icon: "/icons/service.png",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with material design icon", () => {
			const result = Icon({
				name: "Material Service",
				index: 2,
				icon: "mdi-home",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with dashboard icon", () => {
			const result = Icon({
				name: "Dashboard Service",
				index: 3,
				icon: "nextcloud",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with selfhst icon", () => {
			const result = Icon({
				name: "SelfHst Service",
				index: 4,
				icon: "selfhst-jellyfin",
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With iconColor variations", () => {
		testColors.forEach((color, index) => {
			test(`should render with ${color} iconColor`, () => {
				const result = Icon({
					name: `${color} Service`,
					index: index,
					icon: "mdi-star",
					iconColor: color,
				});
				expect(result).toMatchSnapshot();
			});
		});

		test("should render with hex color", () => {
			const result = Icon({
				name: "Hex Color Service",
				index: 0,
				icon: "mdi-palette",
				iconColor: "#FF6B35",
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With iconBG variations", () => {
		testColors.forEach((color, index) => {
			test(`should render with ${color} iconBG`, () => {
				const result = Icon({
					name: `${color} BG Service`,
					index: index,
					icon: "/icon.png",
					iconBG: `${color}-100`,
				});
				expect(result).toMatchSnapshot();
			});
		});

		test("should render with hex background", () => {
			const result = Icon({
				name: "Hex BG Service",
				index: 0,
				icon: "/icon.png",
				iconBG: "#E8F4FD",
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With iconBubble variations", () => {
		test("should render with iconBubble true", () => {
			const result = Icon({
				name: "Bubble Service",
				index: 0,
				icon: "/icon.png",
				iconBubble: true,
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with iconBubble false", () => {
			const result = Icon({
				name: "No Bubble Service",
				index: 1,
				icon: "/icon.png",
				iconBubble: false,
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With iconBubblePadding variations", () => {
		test("should render with iconBubblePadding true", () => {
			const result = Icon({
				name: "Padded Service",
				index: 0,
				icon: "/icon.png",
				iconBubblePadding: true,
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with iconBubblePadding false", () => {
			const result = Icon({
				name: "Unpadded Service",
				index: 1,
				icon: "/icon.png",
				iconBubblePadding: false,
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With iconAspect variations", () => {
		const aspects: IconAspect[] = ["square", "width", "height"];

		aspects.forEach((aspect, index) => {
			test(`should render with iconAspect ${aspect}`, () => {
				const result = Icon({
					name: `${aspect} Service`,
					index: index,
					icon: "/icon.png",
					iconAspect: aspect,
				});
				expect(result).toMatchSnapshot();
			});
		});
	});

	describe("With uri and newWindow variations", () => {
		test("should render with uri", () => {
			const result = Icon({
				name: "Linked Service",
				index: 0,
				icon: "/icon.png",
				uri: "https://example.com",
				standalone: true,
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with uri and newWindow true", () => {
			const result = Icon({
				name: "New Window Service",
				index: 0,
				icon: "/icon.png",
				uri: "https://example.com",
				newWindow: true,
				standalone: true,
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with uri and newWindow false", () => {
			const result = Icon({
				name: "Same Window Service",
				index: 0,
				icon: "/icon.png",
				uri: "https://example.com",
				newWindow: false,
				standalone: true,
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With categoryBubblePadding variations", () => {
		test("should render with categoryBubblePadding true", () => {
			const result = Icon({
				name: "Category Padded Service",
				index: 0,
				icon: "/icon.png",
				categoryBubblePadding: true,
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with categoryBubblePadding false", () => {
			const result = Icon({
				name: "Category Unpadded Service",
				index: 0,
				icon: "/icon.png",
				categoryBubblePadding: false,
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("Combined prop variations", () => {
		test("should render with some optional props", () => {
			const result = Icon({
				name: "Partial Service",
				index: 0,
				icon: "mdi-cog",
				iconColor: "blue",
				iconBubble: true,
			});
			expect(result).toMatchSnapshot();
		});

		testColors.forEach((color, index) => {
			test(`should render with ${color} theme combination`, () => {
				const result = Icon({
					name: `${color.charAt(0).toUpperCase() + color.slice(1)} Service`,
					index: index,
					icon: "mdi-star",
					iconColor: color,
					iconBG: `${color}-100`,
					iconBubble: true,
					iconBubblePadding: index % 2 === 0,
					iconAspect: index % 3 === 0 ? "square" : index % 3 === 1 ? "width" : "height",
					uri: `https://${color}.example.com`,
					newWindow: index % 2 === 0,
					standalone: true,
				});
				expect(result).toMatchSnapshot();
			});
		});

		test("should render with all props", () => {
			const result = Icon({
				name: "Complete Service",
				index: 0,
				icon: "https://example.com/complete-icon.png",
				iconColor: "indigo",
				iconBG: "indigo-50",
				iconBubble: true,
				iconBubblePadding: true,
				iconAspect: "square",
				uri: "https://complete.example.com",
				newWindow: true,
				categoryBubblePadding: true,
				standalone: true,
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with all props using long strings", () => {
			const result = Icon({
				name: longString,
				index: 99,
				icon: "https://very-long-domain-name.example.com/path/to/very/long/icon/filename/with/lots/of/descriptive/text.png",
				iconColor: "#FF6B35",
				iconBG: "#E8F4FD",
				iconBubble: true,
				iconBubblePadding: true,
				iconAspect: "width",
				uri: "https://very-long-domain-name-for-testing.example.com/with/a/very/long/path",
				newWindow: false,
				categoryBubblePadding: false,
				standalone: true,
			});
			expect(result).toMatchSnapshot();
		});

		test("should render without icon (blank icon)", () => {
			const result = Icon({
				name: "Blank Icon Service",
				index: 5,
				uri: "https://example.com",
				standalone: true,
			});
			expect(result).toMatchSnapshot();
		});

		test("should render without icon and without uri", () => {
			const result = Icon({
				name: "Static Blank Service",
				index: 7,
			});
			expect(result).toMatchSnapshot();
		});
	});
});
