const path = require('path');
const fs = require('fs');
const { promises: fsPromises } = require('fs');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

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
            },
          );
        }
      }
    });
  }
});

const destination = path.join(__dirname, 'project-dist', 'assets');
const source = path.join(__dirname, 'assets');

fs.access(destination, function (error) {
  if (error) {
    copyRes();
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
  await fs.mkdir(destination, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  });
  copyData();
}

function copyRes() {
  fsPromises.mkdir(destination);
  copyData(source, destination);
}

function copyData(data, dest) {
  // fs.mkdir(destination, { recursive: true }, (err) => {
  //   if (err) {
  //     return console.error(err);
  //   }
  fs.readdir(data, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        const fileName = file.name.toString();
        const dataPath = path.join(data, fileName);
        const destPath = path.join(dest, fileName);
        if (file.isDirectory()) {
          fsPromises.mkdir(destPath, { recursive: true });
          copyData(dataPath, destPath);
        } else if (file.isFile()) {
          fsPromises.copyFile(dataPath, destPath).catch(function (error) {
            console.log(error);
          });
        }
      });
    }
  });
  // });
}

const startHtml = fs.createReadStream(
  path.join(__dirname, 'template.html'),
  'utf-8',
);
// const finalHtml = fs.createWriteStream(
//   path.join(__dirname, 'project-dist', 'index.html'),
// );

const finalHtml = path.join(__dirname, 'project-dist', 'index.html');

let tempStr = '';
const components = path.join(__dirname, 'components');

startHtml.on('data', async (data) => {
  tempStr = data;
  fs.promises.readdir(components, { withFileTypes: true }).then((arr) => {
    arr.forEach((item) => {
      const [itemName, type] = item.name.split('.');
      if (type === 'html') {
        const itemSource = fs.createReadStream(
          path.join(components, item.name),
          'utf-8',
        );
        let itemData;
        itemSource.on('data', (data) => {
          itemData = data;
          tempStr = tempStr.replace(`{{${itemName}}}`, itemData);
          fs.writeFile(finalHtml, tempStr, (err) => {
            if (err) {
              console.log(err.message);
            }
          });
        });
      }
    });
  });
});
