const Stream = require('./modules/stream.js')
const path = require('path')
const jsonPath = './config.json'
const filePath = path.resolve(__dirname, jsonPath)

//Create a new instance of Stream class
let stream = new Stream(filePath)

stream.start()
