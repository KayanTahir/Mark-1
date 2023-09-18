const brain = require('brainjs');
const data = require('../model/data.json');  // Path to your numeric data.json

const net = new brain.NeuralNetwork();

const formattedData = data.map(item => ({
  input: item.input,
  output: item.output
}));

net.train(formattedData);

const inputToRun = [201646345435];  // Numeric input corresponding to 'e'
const output = net.run(inputToRun);
console.log(`Output: ${output}`);
