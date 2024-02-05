import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    base_url_dev: 'http://localhost:3000',
    base_url_prod: 'https://animated-authentication.netlify.app',
  },
});
