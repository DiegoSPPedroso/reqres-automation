const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true, // Habilita a gravação de vídeos
  screenshotOnRunFailure: true, // Tira screenshots em falhas
  videosFolder: 'cypress/videos', // Pasta onde os vídeos serão salvos
  screenshotsFolder: 'cypress/screenshots', // Pasta onde as capturas de tela serão salvas

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // Implementar listeners de eventos se necessário
    },
    baseUrl: 'https://reqres.in', // Definir a base URL
  },
});
