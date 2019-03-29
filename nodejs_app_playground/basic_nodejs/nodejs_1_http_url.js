'use strict'

// Use the require directive to load the Built-in HTTP Module and store the returned HTTP instance into a variable
var http = require('http')
var queryString = require('querystring')
var formidable = require('formidable')

// Create a server instance and then bind it at prot 8888
http.createServer(function (request, response) {

	if(request.url != "/favicon.ico"){  // 清除第二次访问

	    // Send HTTP header, HTTP Status: 200 : OK, Content Type: text/html, text/plain
	    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });   // response.setHeader("Content-Type", "text/html;charset=utf-8");
	    console.log(`Visiting ${request.url}`, "utf-8");
	    // Send response body
	    response.write("<h1>Hello World!</h1>");
		response.end("I'm NodeJS.(^v^)");  // 不写则没有http协议尾，但写了会产生两次访问，需要清除。response.end() complete，终止请求响应？
		// response.end((1 + 2 + 3).toString());   // end()参数是string类型
		

	    // serve JSON response from the Node.js web server
	    if (request.url == '/json_data') {
	    	response.writeHead(200, { 'Content-Type': 'application/json' });
	        response.write(JSON.stringify({ message: "Hello World" }));  
	        response.end();  
		}
    } else {
		return;
	}
}).listen(8888, "127.0.0.5")
// Terminal Log Info
console.log("*****Server running at http://127.0.0.5:8888/*****")



// The Built-in URL Module
var url = require('url')

var address = 'http://localhost:8080/default.html?year=2017&month=february#hash'
var q = url.parse(address, true)

console.log("host: ", q.host)   // 'localhost:8080'
console.log("pathname: ", q.pathname)   // '/default.html'
console.log("search: ", q.search)   // '?year=2017&month=february'

var qdata = q.query   // object: { year: 2017, month: 'february' }
console.log("query", qdata)   //
console.log(qdata.month)   // 'february'



/**
 * Router Example
 * 
 * 127.0.0.1:3000/student/1234567890
 * 127.0.0.1:3000/teacher/123456
 */
var server_2 = http.createServer((req, res) => {
	var userUrl = req.url()
	res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"})
	if(userUrl.substr(0, 9) == '/student/') {
		var studentId = userUrl.substr(9)
		if(/^\d{10}$/.test(studentId)) {
			res.end('Student ID: ' + studentId)
		} else {
			res.end('Student ID digital number is not 10!')
		}
	} else if(userUrl.substr(0, 9) == '/teacher/') {
		var teacherId = userUrl.substr(9)
		if(/^\d{6}$/.test(teacherId)) {
			res.end('Teacher ID: ' + teacherId)
		} else {
			res.end('Teacher ID digital number is not 6!')
		}
	} else {
		res.end('Please check your URL.')
	}
})

server_2.listen(3000, '127.0.0.1')

/* form.html
<form action="http://127.0.0.1:80/dopost" method="post" enctype="multipart/form-data">
	<p>Name: <input type="text" name="name" /></p>
	<p>Gender: 
		<input type="radio" name="gender" value="male" /> male
		<input type="radio" name="gender" value="female" /> female
	</p>
	<p>
		Hobbies:
		<input type="checkbox" name="hobby" value="soccer" /> soccer
		<input type="checkbox" name="hobby" value="swimming" /> swimming
		<input type="checkbox" name="hobby" value="computer" /> computer
	</p>
	<p>
		<input type="file" name="picture" />
	</p>
	<p><input type="submit" /></p>
</form>
*/

http.createServer((req, res) => {
	if('/dopost' == req.url && 'post' == req.method.toLowerCase()) {
		/**
		 * 以下是post请求接收的公式代码：
		 * Node.js为了追求极致，一段段地接收请求，接收了一段，可能就服务其它（异步），防止一个过大的表单提交阻塞了整个进程。
		 */
		var alldata = ''
		req.addListener('data', (chunk) => {   // 异步！
			alldata += chunk
			console.log(chunk)
		})
		req.addListener('end', () => {
			var dataString = alldata.toString()   // name=%E8%80%83&gender=%E7%94%B7
			// 
			var dataObject = queryString.parse(dataString)   // {name:'Cola', gender:'male', hobbies:['soccer', 'computer']}
			console.log(dataObject.name + ', ' + dataObject.gender)   // 
			res.end('Submitted!')
		})
	}
}).listen(3000)


http.createServer((req, res) => {
	if('/dopost' == req.url && 'post' == req.method.toLowerCase()) {
		var form = new formidable.IncomingForm()
		form.uploadDir = './uploads'   // 需要先创建该文件夹？
		// 执行回调函数时，表单已经全部接收
		form.parse(req, (err, fields, files) => {
			if(err) throw err
			console.log(fields)   // {name:'Cola', gender:'male', hobbies:['swimming', 'computer'], picture:'1.jpg'}
			console.log(files)   // {picture: File{... path:'uploads\\upload_96159ef4d15e88', name:'demo.jpg'}}
			// console.log(util.inspect({fields:fields, files: files}))
			res.writeHead(200, {'Content-Type': 'text/plain'})
			res.write('Received upload:\n\n')
			res.end('Submitted!')
		})
		req.addListener('data', (chunk) => {
			alldata += chunk
			console.log(chunk)
		})
		req.addListener('end', () => {
			var dataString = alldata.toString()   // name=%E8%80%83&gender=%E7%94%B7
			// 
			var dataObject = queryString.parse(dataString)   // {name:'Cola', gender:'male', hobbies:['soccer', 'computer']}
			console.log(dataObject.name + ', ' + dataObject.gender)   // 
			res.end('Submitted!')
		})
	}
}).listen(3000)

/*
xhr.onreadystatechange = function() {}
xhr.open('get', '1.html?id=34;gender=34', true)
xhr.send(null)

xhr.open('post', '1.html', true)
xhr.send('id=34&gender=34')
*/



http.createServer((req, res) => {
	if('/dopost' == req.url && 'post' == req.method.toLowerCase()) {
		var form = new formidable.IncomingForm()
		form.uploadDir = './uploads'   // 需要先创建该文件夹？
		// 执行回调函数时，表单已经全部接收
		form.parse(req, (err, fields, files) => {
			if(err) throw err
			console.log(fields)   // {name:'Cola', gender:'male', hobbies:['swimming', 'computer'], picture:'1.jpg'}
			console.log(files)   // {picture: File{... path:'uploads\\upload_96159ef4d15e88', name:'demo.jpg'}}
			// console.log(util.inspect({fields:fields, files: files}))

			var time = require('silly-datetime').format(new Date(), 'YYYYMMDDHHmmss')
			var random = parseInt(Math.random() * 89999 + 10000)
			var extname = require('path').extname(files.picture.name)
			var oldPath = __dirname + '/' + files.picture.path
			var newPath = __dirname + '/uploads/' + time + random + extname

			fs.rename(oldPath, newPath, (err) => {
				if(err) throw Error('Rename failed...')
				else {
					res.writeHead(200, {'Content-Type': 'text/plain'})
					res.write('Received upload:\n\n')
					res.end('Submitted!')
				}
			})
		})
	} else if (req.url == '/') {
		fs.readFile(__dirname + './form.html', (err, data) => {
			if(err) throw Error('Read failed...')
			else {
				res.writeHead(200, {'Content-Type':'text/html;charset=utf8'})
				res.end(data)	
			}
		})
	} else {
		res.writeHead(404, {'Content-Type':'text/html;charset=utf8'})
		res.end('Not Found...')
	}
}).listen(3000)