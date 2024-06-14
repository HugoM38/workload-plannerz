const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  publicPath:
    process.env.NODE_ENV === "production" ? "/workload-plannerz/" : "/",

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'https://workload-plannerz-api-8f1fb119eefd.herokuapp.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
