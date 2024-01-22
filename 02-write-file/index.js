const path = require('path');
const fs = require('fs');
// const rd = require('readline');
const { stdin, stdout } = process;

const textPath = path.join(__dirname, 'text.txt');
const writedText = fs.createWriteStream(textPath);

stdout.write('Загадайте желание Деду Морозу: \n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Ваши пожелания приняты, Новый Год через год! :) \n');
    process.exit();
  }
  stdout.write('Прекрасное желание, введите еще одно \n');
  writedText.write(data);
});

process.on('SIGINT', () => {
  stdout.write('Ваши пожелания приняты, Новый Год через год! :)');
  process.exit();
});
