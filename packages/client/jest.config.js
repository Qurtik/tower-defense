import dotenv from 'dotenv'

dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-fixed-jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    'ts-jest': {
      tsconfig: false,
      useESM: true,
      babelConfig: true,
      plugins: ['babel-plugin-transform-vite-meta-env'],
    },
  },
  globalTeardown: '<rootDir>/src/app/providers/jest/config/teardown.ts',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$':
      '<rootDir>/src/app/providers/jest/config/fileMock.ts',
    '^.+\\.(css|less|scss|sass)$':
      '<rootDir>/src/app/providers/jest/config/styleMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1', // [optional] Are you using aliases?
  },
  setupFilesAfterEnv: ['<rootDir>/src/app/providers/jest/config/setupTests.ts'],
}
