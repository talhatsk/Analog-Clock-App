/**
 * Jest setup: mock native modules that are not available in the test environment.
 */
/* eslint-env jest */
jest.mock('react-native-nitro-sqlite', () => ({
  open: jest.fn(() => ({
    executeAsync: jest.fn().mockResolvedValue({results: []}),
    transaction: jest.fn(fn =>
      fn({
        executeAsync: jest.fn().mockResolvedValue(undefined),
      }),
    ),
  })),
}));
