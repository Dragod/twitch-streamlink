// Use streamlink to run twich stream or others stream from the CLI.

const execSync = require('child_process').execSync;
const twitch = "twitch.tv/";

const argv = require('minimist')(process.argv.slice(2),
{
    string: ['streamer'],
    alias: {
        s: 'streamer',
    },
    unknown: function(){
    }
    });

function getArgs(arg)
{
    let args =
    {
        "streamer": argv.streamer,

    };
    return args[arg] ;
}

function nodeExec(cmd)
{
    return execSync(cmd, { stdio: [0, 1, 2] });
}

const streamerName = ["zizaran", "datmodz", "moistcr1tikal", "steelmage", "stermy"];

function getStream()
{
    if (getArgs('streamer'))
    {
        // Check if the streamer and the platform are both available, otherwise throw an error.
        if (streamerName.includes(getArgs('streamer')) === true)
        {
            link = `streamlink ${twitch}${getArgs('streamer')} best --title ${getArgs('streamer')}`;

            return nodeExec(link)
        }
        else
        {
            console.log("\n\rError, streamer non supported...");
            process.exit(1);
        }
    }
}

getStream();