module.exports = {
	testEnvironment: "node",
	roots: ["<rootDir>/src", "<rootDir>/tests"],
	testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
	transform: {
		"^.+\\.ts$": [
			"@swc/jest",
			{
				jsc: {
					parser: { syntax: "typescript" },
					target: "esnext",
				},
				module: { type: "commonjs" },
			},
		],
	},
	moduleFileExtensions: ["ts", "js", "json"],
	collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
	setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};
