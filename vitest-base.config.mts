import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    // Keep the jsdom-heavy Design Lab suites parallel without allowing the
    // default all-core worker fan-out to starve individual 5s test budgets.
    maxWorkers: 4,
  },
});
