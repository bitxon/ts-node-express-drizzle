// Read more: https://kulshekhar.github.io/ts-jest/docs/guides/esm-support
import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  verbose: true,
  globalSetup: "<rootDir>/test/global-setup.ts",
  preset: "ts-jest/presets/default-esm", // or other ESM presets
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};

export default jestConfig;
