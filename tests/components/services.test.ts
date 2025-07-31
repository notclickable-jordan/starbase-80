import { Services } from "../../src/components/services";
import { IService } from "../../src/shared/types";

describe("Services Component", () => {
	const testColors = ["blue", "rose", "green", "red", "yellow"];
	const longString =
		"This is a very long service name or description that tests how the component handles extensive text content and ensures that it properly renders without breaking the layout or functionality";

	const createTestService = (name: string, index: number = 0): IService => ({
		name,
		uri: `https://service${index}.example.com`,
		description: `Description for ${name}`,
		icon: `/icons/service${index}.png`,
	});

	const createLongTestService = (index: number = 0): IService => ({
		name: longString,
		uri: `https://very-long-service-name-${index}.example.com/with/long/path`,
		description: `${longString} - extended description`,
		icon: `/very/long/path/to/icon/service${index}-with-long-filename.png`,
	});

	describe("Required props only", () => {
		test("should render with empty services array", () => {
			const result = Services({ services: [] });
			expect(result).toMatchSnapshot();
		});

		test("should render with single service", () => {
			const services = [createTestService("Single Service")];
			const result = Services({ services });
			expect(result).toMatchSnapshot();
		});

		test("should render with multiple basic services", () => {
			const services = [
				createTestService("Service One", 1),
				createTestService("Service Two", 2),
				createTestService("Service Three", 3),
			];
			const result = Services({ services });
			expect(result).toMatchSnapshot();
		});
	});

	describe("With categoryBubblePadding variations", () => {
		test("should render with categoryBubblePadding true", () => {
			const services = [createTestService("Padded Service")];
			const result = Services({
				services,
				categoryBubblePadding: true,
			});
			expect(result).toMatchSnapshot();
		});

		test("should render with categoryBubblePadding false", () => {
			const services = [createTestService("Unpadded Service")];
			const result = Services({
				services,
				categoryBubblePadding: false,
			});
			expect(result).toMatchSnapshot();
		});
	});

	describe("With various service configurations", () => {
		test("should render service with all optional properties", () => {
			const services: IService[] = [
				{
					name: "Complete Service",
					uri: "https://complete.example.com",
					description: "A service with all properties",
					icon: "mdi-star",
					iconColor: "blue",
					iconBG: "blue-100",
					iconBubble: true,
					iconBubblePadding: true,
					iconAspect: "square",
					newWindow: true,
				},
			];
			const result = Services({ services });
			expect(result).toMatchSnapshot();
		});

		test("should render service without optional properties", () => {
			const services: IService[] = [
				{
					name: "Minimal Service",
					uri: "https://minimal.example.com",
				},
			];
			const result = Services({ services });
			expect(result).toMatchSnapshot();
		});

		test("should render service without icon", () => {
			const services: IService[] = [
				{
					name: "No Icon Service",
					uri: "https://noicon.example.com",
					description: "Service without an icon",
				},
			];
			const result = Services({ services });
			expect(result).toMatchSnapshot();
		});

		test("should render service without description", () => {
			const services: IService[] = [
				{
					name: "No Description Service",
					uri: "https://nodesc.example.com",
					icon: "/icon.png",
				},
			];
			const result = Services({ services });
			expect(result).toMatchSnapshot();
		});
	});

	describe("With color-themed services", () => {
		testColors.forEach((color, index) => {
			test(`should render ${color} themed services`, () => {
				const services: IService[] = [
					{
						name: `${color.charAt(0).toUpperCase() + color.slice(1)} Service`,
						uri: `https://${color}.example.com`,
						description: `A ${color} themed service`,
						icon: `mdi-circle`,
						iconColor: color,
						iconBG: `${color}-100`,
						iconBubble: true,
						iconBubblePadding: index % 2 === 0,
						iconAspect: "square",
						newWindow: index % 2 === 0,
					},
				];
				const result = Services({ services });
				expect(result).toMatchSnapshot();
			});
		});

		test("should render multiple color-themed services", () => {
			const services: IService[] = testColors.map((color, index) => ({
				name: `${color.charAt(0).toUpperCase() + color.slice(1)} Service`,
				uri: `https://${color}.example.com`,
				description: `${color} themed service description`,
				icon: `mdi-${color === "rose" ? "flower" : color}`,
				iconColor: color,
				iconBG: `${color}-50`,
				iconBubble: true,
				iconBubblePadding: index % 2 === 0,
				iconAspect: index % 3 === 0 ? "square" : index % 3 === 1 ? "width" : "height",
				newWindow: index % 2 === 0,
			}));
			const result = Services({ services });
			expect(result).toMatchSnapshot();
		});
	});

	describe("With long content", () => {
		test("should render services with long strings", () => {
			const services = [createLongTestService(1), createLongTestService(2)];
			const result = Services({ services });
			expect(result).toMatchSnapshot();
		});

		test("should render service with long properties and all options", () => {
			const services: IService[] = [
				{
					name: longString,
					uri: "https://very-long-domain-name-for-testing-purposes.example.com/with/a/very/long/path/that/might/cause/issues",
					description: `${longString} with additional context and more detailed information`,
					icon: "https://very-long-domain.example.com/very/long/path/to/icon/with/very/descriptive/filename.png",
					iconColor: "#FF6B35",
					iconBG: "#E8F4FD",
					iconBubble: true,
					iconBubblePadding: true,
					iconAspect: "width",
					newWindow: false,
				},
			];
			const result = Services({ services, categoryBubblePadding: true });
			expect(result).toMatchSnapshot();
		});
	});

	describe("With different icon types", () => {
		test("should render services with different icon types", () => {
			const services: IService[] = [
				{
					name: "HTTP Icon Service",
					uri: "https://http.example.com",
					icon: "https://example.com/icon.png",
				},
				{
					name: "Local Icon Service",
					uri: "https://local.example.com",
					icon: "/local-icon.png",
				},
				{
					name: "Material Icon Service",
					uri: "https://material.example.com",
					icon: "mdi-home",
				},
				{
					name: "Dashboard Icon Service",
					uri: "https://dashboard.example.com",
					icon: "nextcloud",
				},
				{
					name: "SelfHst Icon Service",
					uri: "https://selfhst.example.com",
					icon: "selfhst-jellyfin",
				},
			];
			const result = Services({ services });
			expect(result).toMatchSnapshot();
		});
	});

	describe("Large service collections", () => {
		test("should render many services efficiently", () => {
			const services: IService[] = Array.from({ length: 12 }, (_, index) => ({
				name: `Service ${index + 1}`,
				uri: `https://service${index + 1}.example.com`,
				description: `Description for service ${index + 1}`,
				icon:
					index % 4 === 0
						? "mdi-star"
						: index % 4 === 1
							? "/icon.png"
							: index % 4 === 2
								? "nextcloud"
								: "selfhst-jellyfin",
				iconColor: testColors[index % testColors.length],
				iconBubble: index % 3 === 0,
				newWindow: index % 2 === 0,
			}));
			const result = Services({ services, categoryBubblePadding: true });
			expect(result).toMatchSnapshot();
		});
	});

	describe("Edge cases", () => {
		test("should handle services with empty strings", () => {
			const services: IService[] = [
				{
					name: "",
					uri: "",
					description: "",
					icon: "",
				},
			];
			const result = Services({ services });
			expect(result).toMatchSnapshot();
		});

		test("should handle services with special characters", () => {
			const services: IService[] = [
				{
					name: 'Service™ & Co. - "The Best" <Solution>',
					uri: "https://special-chars.example.com/?param=value&other=123",
					description: "Description with special chars: @#$%^&*()[]{}|\\;:'\",.<>?",
					icon: "mdi-star",
				},
			];
			const result = Services({ services });
			expect(result).toMatchSnapshot();
		});
	});
});
