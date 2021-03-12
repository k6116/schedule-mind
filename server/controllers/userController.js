
const models = require('../models')
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;
const {spawn} = require('child_process');

function indexUserList(req, res) {

  models.User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
  })
  .then(indexUserList => {
    console.log('Returning user list')
    res.json(indexUserList);
  })
  .catch(error => {
    res.status(400).json({
      title: 'Error (in catch)',
      error: {message: error}
    })

  });
}

function runPython(req, res) {

  var largeDataSet = [];

  // spawn new child process to call the python script
  const python = spawn('python', ['pythontest.py']);

  // Python file can accept arguments. Values after the initial element are read as arguments
  // const python = spawn('python', ['pythontest.py', 'arg1', 'arg2']);

  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...', data);
    largeDataSet.push(data);
  });

  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.json(largeDataSet.join(''))
  });

}

function runPythonScheduler(req, res) {

  const schedulerData = req.body;

  var dataSet;
  var largeDataSet = [];

  // const testObj = {num_nurses: 5};
  // const strTestObj = JSON.stringify(testObj);
  // console.log('strTestObj', strTestObj)
  const strTestObj = JSON.stringify(schedulerData);
  console.log('strTestObj', strTestObj)

  // spawn new child process to call the python script
  const python = spawn('python', ['scheduler2.py', strTestObj]);

  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...', data);
    largeDataSet.push(data);
    dataSet = data;
  });

  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.json(largeDataSet.join(''))
    // res.json(dataSet)
  });

}

module.exports = {
  indexUserList: indexUserList,
  runPython: runPython,
  runPythonScheduler: runPythonScheduler
}
