import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5500/build',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    base_url_dev: 'http://127.0.0.1:5500/build',
    base_url_prod: 'https://animated-authentication.netlify.app',
  },
});
