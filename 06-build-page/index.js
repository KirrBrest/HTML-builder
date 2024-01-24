const path = require("path");
const fs = require("fs");
const {promises: fsPromises} = require("fs");

// fs.mkdir(path.join(__dirname, "project-dist"), {recursive: true}, (err) => {
//   if (err) throw err;
// });

const styles = path.join(__dirname, 'project-dist', 'style.css');
const dataStyle = path.join(__dirname, 'styles');
const result = fs.createWriteStream(styles);

fs.readdir(dataStyle, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = file.name.toString();
        const type = file.name.toString().split('.')[1];
        if (type === 'css') {
          fs.readFile(
            path.join(__dirname, 'styles', filePath),
            'utf-8',
            (err, data) => {
              if (err) throw err;
              const arrStyles = [];
              const style = data.toString();
              arrStyles.push(style);
              for (let i = 0; i < arrStyles.length; i++) {
                result.write(arrStyles[i]);
              }
            }
          );
        }
      }
    });
  }
});

const destination = path.join(__dirname, "project-dist", "assets");
const source = path.join(__dirname, "assets");

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
              path.join(__dirname, "assets", fileName),
              path.join(__dirname, "project-dist", fileName)
            )
            .catch(function (error) {
              console.log(error);
            });
        });
      }
    });
  });
}
