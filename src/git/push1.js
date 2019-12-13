const {spawn} = require('child_process');
const fs = require('fs');

function startPush(name) {
    console.log(`start push ${name}`);
    const spawnObj = spawn('git', ['push'], {
        cwd: 'D:/2019/Porjects/scada'
    });
    spawnObj.stdout.on('data', function (data) {
        let result = data.toString()
        console.log(result);
        if (result.indexOf('up-to-date') != -1) {
            process.exit(-1)
        }
    })
    spawnObj.stderr.on('data', (data) => {
        let result = data.toString()
        if (result.indexOf('TaskCanceledException') != -1) {
            spawnObj.kill()
            startPush(name)
        } else if (result.indexOf('up-to-date') != -1) {
            console.log(result)
            process.exit(-1)
        } else {
            console.log(result)
        }
    })
    spawnObj.on('close', function (code) {
        // console.log('close code : ' + code);
    })
    spawnObj.on('exit', (code) => {
        // console.log('exit code : ' + code);

    });

}

startPush('1')
startPush('2')
startPush('3')
startPush('4')
startPush('5')
startPush('6')
startPush('7')
startPush('8')
startPush('9')
startPush('10')
