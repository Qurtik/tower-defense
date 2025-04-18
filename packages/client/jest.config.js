import dotenv from 'dotenv'

dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-fixed-jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    "ts-jest": {
      tsconfig: false,
      useESM: true,
      babelConfig: true,
      plugins: ["babel-plugin-transform-vite-meta-env"],
    },
  },
  globalTeardown: '<rootDir>/src/config/jest/teardown.ts',
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/config/jest/fileMock.ts',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/src/config/jest/styleMock.ts',
    "^@/(.*)$": "<rootDir>/src/$1", // [optional] Are you using aliases?
  },
  setupFilesAfterEnv: ['<rootDir>/src/config/jest/setupTests.ts'],
}
