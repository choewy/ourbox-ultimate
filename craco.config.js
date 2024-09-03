const packageJSON = require('./package.json');
const path = require('path');
const fs = require('fs');

module.exports = {
  webpack: {
    configure: function (config) {
      const version = packageJSON.version;

      fs.writeFileSync('./public/version.json', JSON.stringify({ version }), 'utf-8');

      return config;
    },
    alias: {
      '@common': path.resolve(__dirname, 'src/common'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@interceptors': path.resolve(__dirname, 'src/interceptors'),
      '@apis': path.resolve(__dirname, 'src/apis'),
    },
  },
};
