/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Use babel-jest for transforming TS and JSX
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  // Use explicit Jest environment package
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverage: true,
  collectCoverageFrom: [
    // Solo archivos TypeScript/TSX dentro de modules
    "src/modules/**/*.{ts,tsx}",
    // Omitir archivos de definiciones
    "!src/modules/**/*.d.ts",
  ],
}
