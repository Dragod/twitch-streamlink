const fs = require('fs')
const execSync = require('child_process').execSync;
const argv = require('./cli-args.js')

class Stream {

    constructor(path){

        this.path = path

    }

    readData(){

        try {

            return JSON.parse(fs.readFileSync(this.path))

        } catch (error) {

            console.log(`\n Unable to read from ${this.path}: ${error}`)

            process.exit()
        }

    }

    async getStreamer() {

        let data = await this.readData()

        return data.streamer.find(streamer => streamer.name === argv.streamer)

    }

    async getAllStreamers() {

        let data = await this.readData()

        let availableStreamers = []

        data.streamer.forEach(streamer => {

            availableStreamers.push(streamer.name)

        });

        return availableStreamers

    }

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

            console.log(`\nAvailable streamers:\n\r`);

            await this.getAllStreamers().then(data => { console.log(data) })

        }
    }

}

module.exports = Stream