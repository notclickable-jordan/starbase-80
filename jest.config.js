module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/src", "<rootDir>/tests"],
	testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
	moduleFileExtensions: ["ts", "js", "json"],
	collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
	setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};
