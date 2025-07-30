import { Anchor } from "../../src/components/anchor";

describe("Anchor Component", () => {
	const testColors = ["blue", "rose", "green", "red", "yellow"];
	const longString =
		"This is a very long string that tests how the component handles extensive text content and ensures that it properly renders without breaking the layout or functionality of the anchor element";

	describe("Required props only", () => {
		test("should render with just uri", () => {
			const result = Anchor({ uri: "https://example.com" });
			expect(result).toMatchSnapshot();
		});
	});

	describe("With title variations", () => {
		test("should render with short title", () => {
			const result = Anchor({
				uri: "https://example.com",
				title: "Short Title",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with long title", () => {
			const result = Anchor({
				uri: "https://example.com",
				title: longString,
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With className variations", () => {
		testColors.forEach((color, index) => {
			test(`should render with ${color} className`, () => {
				const result = Anchor({
					uri: "https://example.com",
					className: `text-${color}-500 bg-${color}-100 hover:bg-${color}-200`,
				});
				expect(result).toMatchSnapshot();
			});
		});

		test("should render with long className", () => {
			const result = Anchor({
				uri: "https://example.com",
				className:
					"flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With children variations", () => {
		test("should render with simple text children", () => {
			const result = Anchor({
				uri: "https://example.com",
				children: "Click me!",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with HTML children", () => {
			const result = Anchor({
				uri: "https://example.com",
				children: "Launch App",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with long children content", () => {
			const result = Anchor({
				uri: "https://example.com",
				children: longString,
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With newWindow variations", () => {
		test("should render with newWindow explicitly true", () => {
			const result = Anchor({
				uri: "https://example.com",
				newWindow: true,
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with newWindow explicitly false", () => {
			const result = Anchor({
				uri: "https://example.com",
				newWindow: false,
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("Combined prop variations", () => {
		test("should render with some required and optional props", () => {
			const result = Anchor({
				uri: "https://example.com",
				title: "Example Site",
				children: "Visit Example",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with all props", () => {
			const result = Anchor({
				uri: "https://example.com",
				title: "Complete Example",
				className: "btn btn-primary",
				children: '<i class="icon-external"></i> External Link',
				newWindow: true,
			});
			expect(result).toMatchSnapshot();
		});

		testColors.forEach((color, index) => {
			test(`should render with all props and ${color} theme`, () => {
				const result = Anchor({
					uri: `https://${color}.example.com`,
					title: `${color.charAt(0).toUpperCase() + color.slice(1)} themed link`,
					className: `text-${color}-600 hover:text-${color}-800 underline`,
					children: `${color.charAt(0).toUpperCase() + color.slice(1)} Link`,
					newWindow: index % 2 === 0,
				});
				expect(result).toMatchSnapshot();
			});
		});

		test("should render with all props using long strings", () => {
			const result = Anchor({
				uri: "https://very-long-domain-name-for-testing-purposes.example.com/with/a/very/long/path/that/might/cause/issues",
				title: longString,
				className:
					"inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200",
				children: `<div class="flex items-center space-x-2"><span>${longString}</span></div>`,
				newWindow: true,
			});
			expect(result).toMatchSnapshot();
		});
	});
});
