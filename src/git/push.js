var child_process = require('child_process');
var iconv = require('iconv-lite');
var encoding = 'cp936';
var binaryEncoding = 'binary';

child_process.spawn('git push -ee', { encoding: binaryEncoding }, function(err, stdout, stderr){
    console.log(iconv.decode(new Buffer(stdout, binaryEncoding), encoding), iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
});
