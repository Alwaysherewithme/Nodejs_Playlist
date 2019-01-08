# NodeJS study codes...

echo "# NodeJS_Study" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/Alwaysherewithme/NodeJS_Study.git
git push -u origin master

----
## Hot Node.js

- Node-Webkit
- appjs
- musicquiz
- Jade
- Ghost
- Yamr
- Grunt
- Express.js
- gulp
- Nodecast
- Log.io
- Hyro
- PDFKit
- Haroopad
- NoduinoWeb
- Filsh
- Forever
- NodeOS
- Imdex
- ...


## Study Websites

- [nodejs.org]()
- [npmjs.com]()
- [github.com]()
- [stackoverflow.com]()

## 
CommonJs规范可参考：http://javascript.ruanyifeng.com/nodejs/module.html


模块的分类：核心模块、文件模块、第三方模块


模块的流程：

1、创建模块。teacher.js
2、导出模块。exports.add = function() {}; export是一个对象，可以挂载属性，number,data, string等。
3、加载模块。var teacher = require('./teacher.js);
4、使用模块。teacher.add("Scot");


url.parse(urlstr,[parseQueryString],[stashesDenoteHost])  解析
url.format(urlobj) 格式拼接，获取正确的能解析的地址
url.resolve(from,to) 拼接地址

url.parse():将url字符串转换为url对象 
url.format():将url对象格式化为url字符串 
url.resolve():用于解析，接受两个参数，拼接

//解析url地址为对象
url.parse('一个有参数的URL',true)     //query有解析
url.parse('一个有参数的URL')     //query没有解析
url.parse("//imooc.com",true,true);将第三个参数设置为true后在不知道协议的情况下仍可正确解析域名与路径



一、序列化与反序列化

1、序列化：
querystring.stringify({name:'scott',course:['jade','name']}, ',', ':');

(1){}:url参数.(2)第2个参数的‘，’表示，代替&，（3）第3个参数的':'表示：代替=。

2、反序列化：
querystring.parse('name=scott&course=jade');

querystring.parse('name=scott,course=jade',',');

querystring.parse('name:scott,course:jade', ',', ':');

querystring.parse('name:scott,course:jade', ',', ':', 0);   // 最后一个参数maxKey=0，就对key的个数没有限制了。

二、转译与反转译

1、转译：querystring.escape('<哈哈>');

2、反转译：querystring.unescape();


首先查看浏览器的dns缓存是否存在chrome://net-internals/#dns

如果浏览器的失效，操作系统搜索自身的dns缓存

如果操作系统的dns也没有找到，那么就读取本地的host文件

如果以上都没有就会像运营商发起dns解析请求

然后tcp三次握手建立连接






一、http1.0的请求方法（8种）：
get、post、put、delete、head、trace、options

4xx：客户端错误

5xx：服务端错误

400：客户端语法错误

401：请求没有授权

403：服务端收到请求但拒绝提供服务，可能没有权限等等

404：地址找不到，访问的地址不存在


1. 什么是回调？
回调是异步编程时的基础，将后续逻辑封装成起始函数的参数，逐层嵌套。

2. 什么是同步/异步？
同步是指：发送方发出数据后，等接收方发回响应以后才发下一个数据包的通讯方式。  
异步是指：发送方发出数据后，不等接收方发回响应，接着发送下个数据包的通讯方式。

3. 什么是I/O？
磁盘的写入（in）磁盘的读取（out）。

4. 什么的单线程/多线程？
一次只能执行一个程序叫做单线程。
一次能执行多个程序叫多线程。

5. 什么是阻塞/非阻塞？
阻塞：前一个程序未执行完就得一直等待。
非阻塞：前一个程序未执行完时可以挂起，继续执行其他程序，等到使用时再执行。

6. 什么是事件？
一个触发动作（例如点击按钮）。

7. 什么是事件驱动？
一个触发动作引起的操作（例如点击按钮后弹出一个对话框）。

8. 什么是基于事件驱动的回调？
为某个事件注册了回调函数，但是这个回调函数不是马上执行，只有当事件发生的时候，才会调用回调函数，这种函数执行的方式叫做事件驱动。这种注册回调就是基于事件驱动的回调，如果这些回调和异步I/O(数据写入、读取)操作有关，可以看作是基于回调的异步I/O，只不过这种回调在nodejs中是由事件来驱动的

9. 什么是事件循环？
事件循环——Eventloop，倘若有大量的异步操作，一些I/O的耗时操作，甚至是一些定时器控制的延时操作，它们完成的时候都要调用相应的回调函数，从而来完成一些密集的任务，而又不会阻塞整个程序执行的流程，此时需要一种机制来管理，这种机制叫做事件循环。总而言之就是：管理大量异步操作的机制叫做事件循环。

Event Loop:回调函数队列。异步执行的函数会被压入这个队列; 队列被循环查询。
Node.js靠一个单线程不断查询队列中是否有事件，当读取到一个事件时，将调用与此事件关联的回调函数，事件循环是个先进先出的任务队列，回调函数按照它们被加入队列的顺序来执行。整个队列看成是普通函数、回调函数构成的。

sudo nano /etc/apache2/apache2.conf

Redirect 301 /post1 https://eborchids.com/post2
Redirect 301 https://www.test-wm-profile.perform.plus/login https://test-wm-profile.perform.plus

sudo service apache2 graceful


## What is Express?

ExpressJS is a minimalistic, open source web framework for Node.js
- Used to build powerful web applications and APIs



如何通过饿了么 Node.js 面试:
https://juejin.im/entry/58b00f762f301e0068f968ad

2019 年，19 种方法让自己成为更好的 Node.js 工程师:
https://juejin.im/post/5c222a0c6fb9a04a0604e628

Node.js面试题之2017:
https://blog.fundebug.com/2017/04/10/nodejs-interview-2017/

10个常见的Node.js面试题:
https://www.jianshu.com/p/2e0284db8e1d

Node.js 的面试题是怎么样的？
https://www.zhihu.com/question/24648388

【译】Node.js 面试问题及答案(2017版):
https://w3ctech.com/topic/1969

https://github.com/jimuyouyou/node-interview-questions


https://www.devsaran.com/blog/10-best-nodejs-frameworks-developers
http://nodeframework.com/
