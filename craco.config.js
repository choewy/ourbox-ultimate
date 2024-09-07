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
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
};
