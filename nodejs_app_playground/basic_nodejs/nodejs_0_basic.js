/**
 * Execution of a function
 */

(function() {
    console.log("Hello Nodejs!");
}())
// Hello Nodejs!

(function() {
    console.log("Hello Nodejs!")
})()
// Hello Nodejs!

!function() {
    console.log("Hello Nodejs!");
}()
// Hello Nodejs! \n true

!function() {
    console.log("Hello Nodejs!");
}
// false

(function() {
    console.log("Hello Nodejs!");
})
// f() { console.log("Hello Nodejs!"); }

// invoke the pre-declared function:
function hello() {
    console.log("Hello Nodejs!")
}
hello()

// without function:
console.log("Hello Nodejs!")



/**
 * 
 */

var http = require("http");
var otherfun = require("./modules/module_1.js");
http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

    if(request.url!="/favicon.ico"){
        console.log("Visiting……");
        fun1(response);  // 调用本地函数
        //otherfun(response);  // 调用只有一个函数的外部函数，这里使用上文定义的变量otherfun
        // 用字符串调用对应的函数
        funname = "fun4";
        otherfun[funname](response);
        otherfun.fun2(response);
        otherfun['fun3'](response);
        response.end("(^v^)");
    }
    
}).listen(8888);

console.log("*****Server running at http://127.0.0.1:8888/*****");

// 本地函数
function fun1(res) {
    console.log("Local JS function: fun1(){...}");
    res.write("This is fun1(){...}<br/>");
}


/**
 * 
 */

var http = require("http");
var UserEmployee = require("./modules/module_2_user");
var Teacher = require("./modules/module_2_teacher");

http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

    if(request.url!="/favicon.ico"){
        console.log("Visiting……");
        
        user = new UserEmployee.user();
        user.id = 1;
        user.name = "Alvis";
        user.age = 16;
        user.enter();
        
        employee = new UserEmployee['employee'](2, "Eric", 22);
        employee.work();

        teacher = new Teacher(3, "Mary", 32);
        teacher.work();  // 继承父类的方法
        teacher.teach(response);  // 子类自身的方法

        response.end("(^v^)");

    }
    
}).listen(8888);

console.log("*****Server running at http://127.0.0.1:8888/*****");

/**
 * 
 */

// process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function () {
    console.log('nextTick callback!');
});
console.log('nextTick was set!');

/**
 * 
 */
'use strict';

var fs = require('fs');

var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('output2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();

/**
 * 
 */
'use strict';

var fs = require('fs');

var rs = fs.createReadStream('output2.txt');
var ws = fs.createWriteStream('output1.txt');

rs.pipe(ws);

/**
 * 
 */
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 6c 6c 6f>

/**
 * 
 */
/*
function heavyCompute(n, callback) {
    var count = 0,
        i, j;

    for (i = n; i > 0; --i) {
        for (j = n; j > 0; --j) {
            count += 1;
        }
    }

    callback(count);
}

heavyCompute(10000, function (count) {
    console.log(count);
});

console.log('hello');
*/


/*
setTimeout(function () {
    console.log('world');
}, 1000);

console.log('hello');
*/


/*
function heavyCompute(n) {
    var count = 0,
        i, j;

    for (i = n; i > 0; --i) {
        for (j = n; j > 0; --j) {
            count += 1;
        }
    }
}

var t = new Date();

setTimeout(function () {
    console.log(new Date() - t);
}, 1000);

heavyCompute(50000);
*/


function sync(fn) {
    return fn();
}

try {
    sync(null);
    // Do something.
} catch (err) {
    console.log('Error: %s', err.message);
}
