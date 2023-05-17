const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  let n = parseInt(input);
  let left = n, right = n;
  while ((left % 100) !== 99 && (right % 100) !== 99) {
    if (left > 1) left--;
    right++;
  }

  if ((left % 100) === 99 && (right % 100) === 99) console.log(right);
  else if ((left % 100) === 99) console.log(left);
  else console.log(right);
});
