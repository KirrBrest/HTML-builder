const path = require('path');
const fs = require('fs');

const { promises: fsPromises } = require('fs');

const destination = path.join(__dirname, 'files-copy');
const source = path.join(__dirname, 'files');

fs.access(destination, function (error) {
  if (error) {
    copyData();
  } else {
    delCopy();
  }
});

async function delCopy() {
  await fsPromises.rm(destination, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  });
  copyData();
}

function copyData() {
  fs.mkdir(destination, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    fs.readdir(source, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach((file) => {
          const fileName = file.name.toString();

          fsPromises
            .copyFile(
              path.join(__dirname, 'files', fileName),
              path.join(__dirname, 'files-copy', fileName),
            )
            .catch(function (error) {
              console.log(error);
            });
        });
        console.log('Mission Complete');
      }
    });
  });
}
