import { ServiceCatalogList } from "../../src/components/service-catalogs";
import { IService, IServiceCategory } from "../../src/shared/types";

describe("ServiceCatalogList Component", () => {
	const testColors = ["blue", "rose", "green", "red", "yellow"];
	const longString =
		"This is a very long category name or service name that tests how the component handles extensive text content and ensures that it properly renders without breaking the layout or functionality";

	const createTestService = (name: string, index: number = 0): IService => ({
		name,
		uri: `https://service${index}.example.com`,
		description: `Description for ${name}`,
		icon: `/icons/service${index}.png`,
	});

	const createTestCategory = (
		category: string,
		services: IService[],
		options: Partial<IServiceCategory> = {}
	): IServiceCategory => ({
		category,
		services,
		...options,
	});

	describe("Required props only", () => {
		test("should render with empty categories array", () => {
			const result = ServiceCatalogList({ categories: [] });
			expect(result).toMatchSnapshot();
		});

		test("should render with single category", () => {
			const categories = [
				createTestCategory("Development", [
					createTestService("Code Editor", 1),
					createTestService("Git Server", 2),
				]),
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});

		test("should render with multiple categories", () => {
			const categories = [
				createTestCategory("Development", [
					createTestService("IDE", 1),
					createTestService("Version Control", 2),
				]),
				createTestCategory("Media", [
					createTestService("Video Player", 3),
					createTestService("Music Server", 4),
				]),
				createTestCategory("Productivity", [
					createTestService("Note Taking", 5),
					createTestService("Task Manager", 6),
				]),
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});
	});

	describe("With bubble variations", () => {
		test("should render category with bubble enabled", () => {
			const categories = [
				createTestCategory("Bubble Category", [createTestService("Service 1", 1)], { bubble: true }),
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});

		test("should render category with bubble disabled", () => {
			const categories = [
				createTestCategory("No Bubble Category", [createTestService("Service 1", 1)], { bubble: false }),
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});
	});

	describe("With bubble background variations", () => {
		testColors.forEach((color, index) => {
			test(`should render category with ${color} bubble backgrounds`, () => {
				const categories = [
					createTestCategory(
						`${color.charAt(0).toUpperCase() + color.slice(1)} Category`,
						[createTestService(`${color} Service`, index)],
						{
							bubble: true,
							bubbleBGLight: `${color}-100`,
							bubbleBGDark: `${color}-800`,
						}
					),
				];
				const result = ServiceCatalogList({ categories });
				expect(result).toMatchSnapshot();
			});
		});

		test("should render category with only light bubble background", () => {
			const categories = [
				createTestCategory("Light BG Only", [createTestService("Service", 1)], {
					bubble: true,
					bubbleBGLight: "emerald-50",
				}),
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});

		test("should render category with only dark bubble background", () => {
			const categories = [
				createTestCategory("Dark BG Only", [createTestService("Service", 1)], {
					bubble: true,
					bubbleBGDark: "slate-900",
				}),
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});
	});

	describe("With iconBubblePadding variations", () => {
		test("should render category with iconBubblePadding enabled", () => {
			const categories = [
				createTestCategory("Padded Icons", [createTestService("Padded Service", 1)], {
					iconBubblePadding: true,
				}),
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});

		test("should render category with iconBubblePadding disabled", () => {
			const categories = [
				createTestCategory("Unpadded Icons", [createTestService("Unpadded Service", 1)], {
					iconBubblePadding: false,
				}),
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});
	});

	describe("With long content", () => {
		test("should render category with long name", () => {
			const categories = [createTestCategory(longString, [createTestService("Service in Long Category", 1)])];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});

		test("should render category with long service names", () => {
			const categories = [
				createTestCategory("Long Services", [
					createTestService(longString, 1),
					createTestService(`${longString} - Second`, 2),
				]),
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});
	});

	describe("Color-themed categories", () => {
		testColors.forEach((color, index) => {
			test(`should render ${color} themed category with all options`, () => {
				const services: IService[] = [
					{
						name: `${color.charAt(0).toUpperCase() + color.slice(1)} Service 1`,
						uri: `https://${color}1.example.com`,
						description: `First ${color} service`,
						icon: "mdi-star",
						iconColor: color,
						iconBG: `${color}-100`,
						iconBubble: true,
						newWindow: index % 2 === 0,
					},
					{
						name: `${color.charAt(0).toUpperCase() + color.slice(1)} Service 2`,
						uri: `https://${color}2.example.com`,
						description: `Second ${color} service`,
						icon: `/icons/${color}.png`,
						iconBubble: false,
						newWindow: index % 2 === 1,
					},
				];

				const categories = [
					createTestCategory(`${color.charAt(0).toUpperCase() + color.slice(1)} Applications`, services, {
						bubble: true,
						bubbleBGLight: `${color}-50`,
						bubbleBGDark: `${color}-900`,
						iconBubblePadding: index % 2 === 0,
					}),
				];
				const result = ServiceCatalogList({ categories });
				expect(result).toMatchSnapshot();
			});
		});
	});

	describe("Complex scenarios", () => {
		test("should render multiple categories with different configurations", () => {
			const categories: IServiceCategory[] = [
				{
					category: "Development Tools",
					bubble: true,
					bubbleBGLight: "blue-50",
					bubbleBGDark: "blue-900",
					iconBubblePadding: true,
					services: [
						{
							name: "VS Code Server",
							uri: "https://code.example.com",
							description: "Browser-based code editor",
							icon: "mdi-code-tags",
							iconColor: "blue",
							iconBubble: true,
							newWindow: true,
						},
						{
							name: "GitLab",
							uri: "https://git.example.com",
							description: "Git repository manager",
							icon: "gitlab",
							newWindow: false,
						},
					],
				},
				{
					category: "Media Center",
					bubble: false,
					services: [
						{
							name: "Jellyfin",
							uri: "https://media.example.com",
							description: "Media streaming server",
							icon: "selfhst-jellyfin",
							iconBubble: false,
						},
					],
				},
				{
					category: "Monitoring",
					bubble: true,
					bubbleBGLight: "emerald-100",
					iconBubblePadding: false,
					services: [
						{
							name: "Grafana",
							uri: "https://metrics.example.com",
							description: "Analytics and monitoring",
							icon: "https://grafana.com/static/assets/img/fav32.png",
							iconColor: "orange",
							iconAspect: "square",
						},
						{
							name: "Uptime Kuma",
							uri: "https://uptime.example.com",
							icon: "mdi-heart-pulse",
							iconColor: "green",
							iconBG: "green-100",
							newWindow: true,
						},
					],
				},
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});

		test("should render category with no services", () => {
			const categories = [createTestCategory("Empty Category", [])];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});

		test("should render category with many services", () => {
			const services: IService[] = Array.from({ length: 8 }, (_, index) => ({
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
				newWindow: index % 2 === 0,
			}));

			const categories = [
				createTestCategory("Large Category", services, {
					bubble: true,
					bubbleBGLight: "gray-50",
					bubbleBGDark: "gray-800",
					iconBubblePadding: true,
				}),
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});

		test("should render with all possible combinations", () => {
			const categories: IServiceCategory[] = [
				{
					category: longString,
					bubble: true,
					bubbleBGLight: "purple-50",
					bubbleBGDark: "purple-900",
					iconBubblePadding: true,
					services: [
						{
							name: longString,
							uri: "https://very-long-domain-name.example.com/with/very/long/path",
							description: `${longString} - Extended description with more details`,
							icon: "https://very-long-icon-domain.example.com/path/to/icon.png",
							iconColor: "#FF6B35",
							iconBG: "#E8F4FD",
							iconBubble: true,
							iconBubblePadding: true,
							iconAspect: "width",
							newWindow: false,
						},
					],
				},
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});
	});

	describe("Edge cases", () => {
		test("should handle categories with empty strings", () => {
			const categories = [createTestCategory("", [createTestService("", 1)])];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});

		test("should handle categories with special characters", () => {
			const categories = [
				createTestCategory('Category™ & Co. - "Special" <Characters>', [
					createTestService("Service™ & Co.", 1),
				]),
			];
			const result = ServiceCatalogList({ categories });
			expect(result).toMatchSnapshot();
		});
	});
});
