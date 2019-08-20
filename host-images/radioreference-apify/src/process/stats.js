const dataset = require('../rr-all.json');

let sys = {};
dataset.forEach(item => {
  if (typeof sys[item.systemType] === 'undefined') {
    sys[item.systemType] = 1;
  } else {
    sys[item.systemType] = sys[item.systemType] + 1;
  }
});

const sorted = Object.keys(sys)
  .map(key => {
    return [key, sys[key]];
  })
  .sort((a, b) => b[1] - a[1]);

console.log(`Count\tSystem Type`);
sorted.forEach(tup => {
  console.log(`${tup[1]}\t${tup[0]}`);
});
