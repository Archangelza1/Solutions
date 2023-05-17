const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let sequence = '';

rl.on('line', (input) => {
  sequence = input;
  let one = 0;
  let branch = 1;
  let inversion = 0;

  for (let i = 0; i < sequence.length; i++) {
    const bit = sequence.charAt(i);

    if (bit === '1') {
      one = (one + branch) % 1000000007;
    } else if (bit === '0') {
      inversion = (inversion + one) % 1000000007;
    } else {
      inversion = (2 * inversion + one) % 1000000007;
      one = (2 * one + branch) % 1000000007;
      branch = (2 * branch) % 1000000007;
    }
  }

  console.log(inversion);
});