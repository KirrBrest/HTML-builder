const path = require('path');
const fs = require('fs');

const styles = path.join(__dirname, 'project-dist', 'bundle.css');
const dataStyle = path.join(__dirname, 'styles');
const result = fs.createWriteStream(styles);

fs.readdir(dataStyle, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(dataStyle, file);
        const type = path.extname(filePath);
        if (type === '.css') {
          // const input = fs.createReadStream(filePath);
          // input.on('data', (data) => {
          //   result.write(data + '\n');
          fs.readFile(
            path.join(__dirname, 'styles', filePath),
            'utf-8',
            (data) => {
              const arrStyles = [];
              const style = data.toString();
              arrStyles.push(style);
              for (let i = 0; i < arrStyles.length; i++) {
                output.write(arrStyles[i]);
              }
            }
          );
        }
    }
  });
});
