const argv = require('minimist')(process.argv.slice(2),
{
    string: ['streamer'],
    boolean: ['available', 'help'],
    alias: {
        a: 'available',
        s: 'streamer',
        h: 'help'
    },
    unknown: function(){

        console.log(`\r\n Flag not found.`)

        console.log(`\r\n Available flag: --available/ -a, --streamer/ -s, --help/ -h `);
    }
});

module.exports = argv