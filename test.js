// const { spawn } = require('child_process')

// const pythonVersion = spawn('python', ['--version'])

// const pipVersion = spawn('pip', ['--version'])

// //console.log(pythonVersion);

// //console.log(pipVersion);

// let python = pythonVersion.stdout.on('data', (data) => {

//     //console.log(`stdout: ${data}`)

//     return data.toString()

// })

// // pipVersion.stdout.on('data', (data) => {


// //     console.log(`stdout: ${data}`)


// // })

// console.log(python);

const { spawn }  = require('child_process')

const python = spawn('python', ['--version'])

// Use a variable to save the output
// for when the script closes later
let scriptOutput = "";

python.stdout.setEncoding('utf8');

python.stdout.on('data', function(data) {
    //Here is where the output goes

    console.log('stdout: ' + data);

    data=data.toString();
    scriptOutput+=data;
});

python.stderr.setEncoding('utf8');
python.stderr.on('data', function(data) {
    //Here is where the error output goes

    console.log('stderr: ' + data);

    data=data.toString();
    scriptOutput+=data;
});

python.on('close', function(code) {
    //Here you can get the exit code of the script

    console.log('closing code: ' + code);

    console.log('Full output of script: ',scriptOutput);
});

