const fs = require('fs')
const execSync = require('child_process').execSync;
const argv = require('./cli-args.js')
const CmdOutput = require('./cmd-output')
const os = require('os');

class Stream {

    /**
    * The constructor function is a function that is called when an object is created from a class.
    * @param path - The path to the file you want to read.
    */
    constructor(path){

        this.path = path

    }

    /**
     * It reads the data from the file and returns it as a JSON object.
     * @returns The data from the file.
     */
    readData(){

        try {

            return JSON.parse(fs.readFileSync(this.path))

        } catch (error) {

            console.log(`\n Unable to read from ${this.path}: ${error}`)

            process.exit()
        }

    }

    /**
     * It reads the data from the JSON file, then it returns the streamer object that matches the name
     * passed in as an argument.
     * @returns The streamer object that matches the name passed in via the command line.
     */
    async getStreamer() {

        let data = await this.readData()

        return data.streamer.find(streamer => streamer.name === argv.streamer)

    }

    /**
    * It reads the data from the JSON file, then it loops through the data and pushes the streamer
    * names into an array.
    * @returns An array of streamer names.
    */
    async getAllStreamers() {

        let data = await this.readData()

        let availableStreamers = []

        data.streamer.forEach(streamer => {

            availableStreamers.push(streamer.name)

        });

        return availableStreamers

    }

    /**
     * "If the user passes in a streamer name, then get the streamer's information and start the
     * stream, otherwise if the user passes in the available flag, then get all the available streamers
     * and display them."
     *
     * The first thing I do is check if the user passed in a streamer name. If they did, then I call
     * the getStreamer function and pass in the streamer name. The getStreamer function returns a
     * promise, so I use the then method to get the streamer object
     * @returns The streamer object.
     */
    async start()
    {

        if (argv.streamer)
        {

            try {

                let streamer = await this.getStreamer(argv.streamer).then(streamer => {

                    return streamer

                })

                const streamLink = `streamlink ${streamer.options.url}${streamer.name} ${streamer.options.quality} --title ${streamer.options.title}`

                return execSync(streamLink, { stdio: [0, 1, 2] })

            }

            catch(err) {

                console.log(`\n\rError: ${argv.streamer} is either offline or not a valid name...\n\r`);

                console.log(`Available streamers:\n\r`);

                await this.getAllStreamers().then(data => { console.log(data) })

                process.exit(1);

            }

        }

        else if(argv.available) {

            console.log(`\nAvailable streamers:\n\r`)

            await this.getAllStreamers().then(data => { console.log(data) })

        }

        else if(argv.help) {

            console.log(`\n\rIn order to use twitch-stream-link package you need:\n\n\r - Python 3\n\r - Pip package manager\n\r - Streamlink (from "pip")\n\r - VLC\n\r`)

            console.log(`--------------------------`);

            if(os.platform() === "win32") {

                let vlc = new CmdOutput('vlc', ['--version'])

                vlc.exeExist()
            }
            else {

                console.log('\n\rYou need to install VLC player as a dependency or the player was installed in a different disk. \n\rDefault path: C:/Program Files/VideoLAN/VLC/vlc.exe\n\r');
            }

            console.log(`Installed package/s:\n\r`)

            let python = new CmdOutput('python', ['--version'])

            let streamlink = new CmdOutput('streamlink', ['--version'])

            python.pid()

            streamlink.pid()

        }
    }

}

module.exports = Stream