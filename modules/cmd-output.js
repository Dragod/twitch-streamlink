const { spawn } = require('child_process')
const fs = require('fs')

/* The class is used to check if a package is installed. */
class CmdOutput {

    /**
     * The constructor function is a function that is called when an object is created from a class.
     * @param cmd - The command you want to run.
     * @param flag - This is the flag that will be used to call the command.
     */
    constructor(packageName, flag){

        this.packageName = packageName
        this.flag = flag

    }

    /**
     * The function spawns a child process and checks if the process pid is undefined. If it is, it
     * exits the program.
     *
     */
    pid() {

        let cliProcess = spawn(

                this.packageName,
                this.flag,
                { stdio:
                    [
                        process.stdin,
                        process.stdout,
                        process.stderr
                    ]
                }
            )

        // If process pid is undefined exit as the package is not installed

        this.isInstalled(cliProcess.pid, cliProcess.spawnfile)

    }

    /**
     * If the process ID is undefined, then the process is not installed.
     * @param pid - The process id of the process you want to check.
     * @param processName - The name of the process you want to check for.
     */
    isInstalled(pid, processName) {

        if(pid === undefined){

            console.log(`\n\rYou need to install: ${processName} as a dependency.\n\r`)

            process.exit(1)

        }

    }

    /**
     * If the file path exists, then print "VLC player is installed" to the console.
     * If the file path does not exist, then print "You need to install: VLC player as a dependency" to
     * the console.
     *
     */
    exeExist(){

        try
        {

            if(fs.existsSync('C:/Program Files/VideoLAN/VLC/vlc.exe')) {

                console.log("\n\rVLC player is installed\n\r");

            }
            else {

                console.log('You need to install: VLC player as a dependency');
            }
        }
        catch (err)
        {

            console.error(err);

        }

    }

}

module.exports = CmdOutput
