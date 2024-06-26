import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  moduleNameMapper: { "^axios$": require.resolve("axios") },
  // setupFilesAfterEnv: ["<rootDir>/src/test/mocks/ServerSetup.ts"],
};

export default config;
