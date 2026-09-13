import { SystemStats } from "../../src/components/system-stats";

describe("SystemStats Component", () => {
	test("should render", () => {
		const result = SystemStats();
		expect(result).toMatchSnapshot();
	});

	test("should include a CPU row and a memory row", () => {
		const result = SystemStats();
		expect(result).toContain('data-stat-row="cpu"');
		expect(result).toContain('data-stat-row="memory"');
	});

	test("should include a container for dynamically added disk rows", () => {
		const result = SystemStats();
		expect(result).toContain("data-disk-container");
	});

	test("should include a script that polls /api/stats", () => {
		const result = SystemStats();
		expect(result).toContain("/api/stats");
		expect(result).toContain("<script>");
	});
});
