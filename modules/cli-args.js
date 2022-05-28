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

module.exports = argv