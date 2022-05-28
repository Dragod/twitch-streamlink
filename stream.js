const Stream = require('./modules/stream.js')
const path = require('path')
const jsonPath = './config.json'
const filePath = path.resolve(__dirname, jsonPath)

let stream = new Stream(filePath)

stream.start()
