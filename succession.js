const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

class Person {
  constructor(name, father, mother) {
    this.name = name;
    this.father = father;
    this.mother = mother;
  }
}

const succession = (lines) => {
  let people = {};
  let bloodValues = {}; // memoized blood values
  let [n, m] = lines[0].split(" ").map((x) => parseInt(x));
  let king = lines[1];
  people[king] = new Person(king, "", "");

  for (let i = 0; i < n; i++) {
    let [child, father, mother] = lines[i + 2].split(" ");
    people[child] = new Person(child, father, mother);
  }

  let claimers = lines
    .slice(n + 2)
    .map((x) => people[x])
    .filter((x) => x !== undefined);
  let bloodVals = claimers.map((x) => [
    x,
    getBloodValue(people, x, bloodValues),
  ]);
  return bloodVals.reduce((a, b) => (a[1] > b[1] ? a : b))[0].name;
};

const getBloodValue = (people, person, bloodValues) => {
  if (person === undefined) return 0;
  if (person.father === "" && person.mother === "") return 1;

  // return stored blood value if it exists
  if (bloodValues[person.name]) return bloodValues[person.name];

  let father = people[person.father];
  let mother = people[person.mother];
  let fatherBlood =
    father === undefined ? 0 : getBloodValue(people, father, bloodValues);
  let motherBlood =
    mother === undefined ? 0 : getBloodValue(people, mother, bloodValues);
  let bloodValue = fatherBlood / 2 + motherBlood / 2;

  // store blood value
  bloodValues[person.name] = bloodValue;

  return bloodValue;
};

rl.on("line", (line) => {
  lines.push(line);
});

rl.on("close", () => {
  console.log(succession(lines));
});
