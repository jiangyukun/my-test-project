
const spawn = require('child_process').spawn;

spawn('cmd',  ['date'], {stdio: 'inherit'});
