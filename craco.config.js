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
      '@config': path.resolve(__dirname, 'src/config'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@model': path.resolve(__dirname, 'src/model'),
      '@service': path.resolve(__dirname, 'src/service'),
    },
  },
};
