const path = require('path');
const fs = require('fs');

const folderPath = path.join(__dirname, 'secret-folder');

fs.promises.readdir(folderPath, { withFileTypes: true }).then(files => {
  files.forEach((item) => {
    if (item.isFile()) {
      const filesPath = path.join(__dirname, 'secret-folder', item.name);
      const name = path.basename(filesPath).split('.')[0];
      const extension = path.extname(filesPath).slice(1);

      fs.promises.stat(filesPath).then(res => {
        const fileSize = (res.size);
        console.log(`file: ${name}, extension: ${extension}, with size: ${fileSize}b`);
      });
    }
  });
});
