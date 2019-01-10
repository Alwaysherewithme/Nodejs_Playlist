'use strict'

// The Built-in HTTP Module
var http = require("http")

http.createServer(function (request, response) {

	if(request.url != "/favicon.ico"){  // 清除第二次访问

	    // 发送HTTP头部，HTTP状态值：200: OK，内容类型：text/plain
	    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
	    console.log(`访问：${request.url}`, "utf-8");
	    // 发送响应数据
	    response.write("<h1>Hello World!</h1>");
	    response.end("I'm NodeJS.(^v^)");  // 不写则没有http协议尾，但写了会产生两次访问，需要清除

	    // serve JSON response from the Node.js web server
	    if (request.url == '/json_data') {
	    	response.writeHead(200, { 'Content-Type': 'application/json' });
	        response.write(JSON.stringify({ message: "Hello World" }));  
	        response.end();  
	    }
    }
    
}).listen(8888)
// 终端打印如下信息
console.log("*****Server running at http://127.0.0.1:8888/*****")



// The Built-in URL Module
var url = require('url')

var address = 'http://localhost:8080/default.html?year=2017&month=february'
var q = url.parse(address, true)

console.log("host: ", q.host)   // 'localhost:8080'
console.log("pathname: ", q.pathname)   // '/default.html'
console.log("search: ", q.search)   // '?year=2017&month=february'

var qdata = q.query   // object: { year: 2017, month: 'february' }
console.log("query", qdata)   //
console.log(qdata.month)   // 'february'