import { Header } from "../../src/components/header";

describe("Header Component", () => {
	const testColors = ["blue", "rose", "green", "red", "yellow"];
	const longString =
		"This is a very long header title that tests how the component handles extensive text content and ensures that it properly renders without breaking the layout or functionality of the header element";

	describe("Required props only", () => {
		test("should render with no props", () => {
			const result = Header({});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With title variations", () => {
		test("should render with short title", () => {
			const result = Header({
				title: "My App",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with long title", () => {
			const result = Header({
				title: longString,
			});
			expect(result).toMatchSnapshot();
		});

		testColors.forEach(color => {
			test(`should render with ${color} themed title`, () => {
				const result = Header({
					title: `${color.charAt(0).toUpperCase() + color.slice(1)} Dashboard`,
				});
				expect(result).toMatchSnapshot();
			});
		});

		test("should render with HTML-like title", () => {
			const result = Header({
				title: "App <em>with</em> emphasis & special chars: @#$%^&*()",
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With icon variations", () => {
		test("should render with simple icon path", () => {
			const result = Header({
				icon: "/logo.png",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with full URL icon", () => {
			const result = Header({
				icon: "https://example.com/icon.png",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with long icon path", () => {
			const result = Header({
				icon: "/very/long/path/to/assets/images/icons/application/header/logo-with-very-long-filename.png",
			});
			expect(result).toMatchSnapshot();
		});

		testColors.forEach(color => {
			test(`should render with ${color} themed icon`, () => {
				const result = Header({
					icon: `/icons/${color}-theme-logo.svg`,
				});
				expect(result).toMatchSnapshot();
			});
		});
	});

	describe("Combined prop variations", () => {
		test("should render with both title and icon", () => {
			const result = Header({
				title: "My Application",
				icon: "/logo.png",
			});
			expect(result).toMatchSnapshot();
		});

		testColors.forEach((color, index) => {
			test(`should render with ${color} theme combination`, () => {
				const result = Header({
					title: `${color.charAt(0).toUpperCase() + color.slice(1)} Portal`,
					icon: `/icons/${color}-logo.png`,
				});
				expect(result).toMatchSnapshot();
			});
		});

		test("should render with long strings for both props", () => {
			const result = Header({
				title: longString,
				icon: "/very/long/path/to/assets/images/icons/application/header/main-application-logo-with-very-descriptive-filename.png",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with special characters in title", () => {
			const result = Header({
				title: 'App™ & Co. - "The Best" <Solution> for [Advanced] Users!',
				icon: "/special-logo.svg",
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with empty strings", () => {
			const result = Header({
				title: "",
				icon: "",
			});
			expect(result).toMatchSnapshot();
		});
	});
});
