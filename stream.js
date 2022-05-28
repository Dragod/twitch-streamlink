const Stream = require('./modules/stream.js')
const path = require('path')
const jsonPath = './config.json'
const filePath = path.resolve(__dirname, jsonPath)


/* Creating a new instance of the Stream class. */
let stream = new Stream(filePath)

/* Calling the `start()` method of the `Stream` class. */
stream.start()
