import { defineConfig } from 'vitest/config';

// e2e/ は Playwright の管轄なので、ユニットテストは src/ 配下だけを対象にする
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
