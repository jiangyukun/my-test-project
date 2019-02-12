/**
 * node-http 服务端
 */
let http = require('http');
let url = require('url');
let fs = require('fs');

// 创建服务器
let server = http.createServer((req, res) => {
    // 解析请求
    // let pathname = url.parse(req.url).pathname; // 形如`/index.html`
    // console.log('收到对文件 ' + pathname + '的请求');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    // 响应文件内容
    res.write("xxx");
    res.end();
    // 读取文件内容
    /*fs.readFile(pathname.substr(1), (err, data) => {
        if (err) {
            console.log('文件读取失败：' + err);

            // 设置404响应
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
        }
        else {
            // 状态码：200

        }

        // 发送响应
        res.end();
    });*/
    // test333
});

server.listen(8081);

console.log('服务运行在：http://47.105.100.57:8081，请访问：http://47.105.100.57:8081/index.html');
