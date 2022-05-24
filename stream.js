// Use streamlink to run twich stream or others stream from the CLI.

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

let data = jsonData(filePath)


const argv = require('minimist')(process.argv.slice(2),
{
    string: ['streamer'],
    boolean: ['available'],
    alias: {
        a: 'available',
        s: 'streamer'
    },
    unknown: function(){
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

    const streamer = data.streamer.find(streamer => streamer.name === arg)

    return streamer
}

function getAllStreamers() {

    let availableStreamers = []

    data.streamer.forEach(streamer => {

        availableStreamers.push(streamer.name)

    });

    return `Available streamers names: \n\n\r${availableStreamers}`

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

            console.log(`\n\rError: ${getArgs('streamer')} is either offline or not a valid name...\n\n\r${getAllStreamers()}`);

            process.exit(1);

        }

    }
    else if(getArgs('available')) {

        console.log(`\n\r${getAllStreamers()}`)

    }
}

stream();