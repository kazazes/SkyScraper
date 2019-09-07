const tgs = [
  851.0375,
  851.35,
  851.7625,
  852.2,
  852.2875,
  852.6875,
  853.0375,
  853.0625,
  853.2875,
  853.5375,
  854.9625,
  855.4875,
  855.7375,
  855.9625,
];

const median = tgs.reduce((prev, curr) => prev + curr) / tgs.length;

console.log(`median: ${median}`);
