module.exports = {
  globalSetup: "<rootDir>/test/globalSetup.ts",
  globalTeardown: "<rootDir>/test/globalTeardown.ts",
  moduleFileExtensions: ["ts", "json", "js", "d.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/test/**/*.test.(ts|js)"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^root(.*)$": "<rootDir>/src$1",
  },
  setupFilesAfterEnv: ["<rootDir>/test/setupFile.ts"],
  preset: "ts-jest",
};
