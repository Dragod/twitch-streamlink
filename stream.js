// Use streamlink to run twich stream or others stream from the CLI.

// List available streamers: node stream -a
// Start streaming: node stream -s xqc

const path = require('path')
const fs = require('fs')
const execSync = require('child_process').execSync;
const jsonPath = './config.json'
const filePath = path.resolve(__dirname, jsonPath)

// Read json file

let jsonData = (path) => {

    try {

        return JSON.parse(fs.readFileSync(path))

    } catch (error) {

        console.log(`\n Unable to read from ${path}: ${error}`);
        process.exit()
    }

}

// Store json data into a variable

let data = jsonData(filePath)

// Setup CLI arguments with minimist

const argv = require('minimist')(process.argv.slice(2),
{
    string: ['streamer'],
    boolean: ['available'],
    alias: {
        a: 'available',
        s: 'streamer'
    },
    unknown: function(){

        console.log(`\r\n Flag not found.`)

        console.log(`\r\n Available flag: --available/ -a, --streamer/ -s`);
    }
    });

function getArgs(arg)
{
    let args =
    {
        "streamer": argv.streamer,
        "available": argv.available

    };
    return args[arg] ;
}

function nodeExec(cmd)
{
    return execSync(cmd, { stdio: [0, 1, 2] });
}

function getStreamer(arg) {

    return data.streamer.find(streamer => streamer.name === arg)
}

function getAllStreamers() {

    let availableStreamers = []

    data.streamer.forEach(streamer => {

        availableStreamers.push(streamer.name)

    });

    return console.table(availableStreamers)

}

function stream()
{

    if (getArgs('streamer'))
    {

        try {

            const streamer = getStreamer(getArgs('streamer'))

            const streamLink = `streamlink ${streamer.options.url}${streamer.name} ${streamer.options.quality} --title ${streamer.options.title}`

            return nodeExec(streamLink)

        }

        catch(err) {

            console.log(`\n\rError: ${getArgs('streamer')} is either offline or not a valid name...\n\r`);

            console.log(`Available streamers:\n\r`);

            getAllStreamers()

            process.exit(1);

        }

    }
    else if(getArgs('available')) {

        console.log(`\nAvailable streamers:\n\r`);

        getAllStreamers()

    }
}

stream();
