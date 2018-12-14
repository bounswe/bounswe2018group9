const fs = require('fs');

const config = require('../config');

checkFolder('Temp', config.tempFolder);
checkFolder('Static', config.staticFolder);

function checkFolder(folder, path) {
  fs.stat(path, (err, stats) => {
    if (err) {
      if (!err.code.localeCompare('ENOENT') === 0) {
        throw err;
      }

      fs.mkdir(path, (err) => {
        if (err) throw err;
        console.log(folder + ' directory is created!');
      });
    } else {
      if (!stats.isDirectory()) throw folder + ' directory is occupied!';
      console.log(folder + ' directory is already exists!');
    }
  });
}
