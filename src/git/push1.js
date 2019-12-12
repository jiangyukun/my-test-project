const {spawn} = require('child_process');
const fs = require('fs');
var iconv = require('iconv-lite');
var encoding = 'cp936';

const spawnObj = spawn('git', ['push', '-C D:\\2019\\Porjects\\scada'], {encoding: 'binary'});
spawnObj.stdout.on('data', function (chunk) {
    console.log(chunk);

    console.log(iconv.decode(new Buffer(chunk, 'binary'), encoding))
});
spawnObj.stderr.on('data', (data) => {
    console.log(data.toString());
});
spawnObj.on('close', function (code) {
    console.log('close code : ' + code);
})
spawnObj.on('exit', (code) => {
    console.log('exit code : ' + code);

});
