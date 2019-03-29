'use strict'

// The Built-in File System
var fs = require('fs')
var http = require('http')
var url = require('url')
var path = require('path')


/**
 * Create files
 * 1. fs.appendFile()  2. fs.open()  3. fs.writeFile()
 */
// fs.appendFile() method appends specified content to a file. If the file does not exist, the file will be created:
fs.appendFile('newfile_1.txt', '\n + new content added by fs.appendFile()!', (err) => {
    if(err) throw err
    //console.log("New file named 'newfile_1.txt' is created!");
    console.log('"newfile_1.txt" is updated!')
})

// fs.open() method takes a "flag" as the second argument, if the flag is "w" for "writing", the specified file is opened for writing. If the file does not exist, an empty file is created:
fs.open('empty.txt', 'w', (err, file) => {
    if(err) throw err
    console.log('New file named \'temp.txt\' is created!')
})

// fs.writeFile('newfile_2.txt', 'Hello content by fs.writeFile()!', function(err) {
fs.writeFile('newfile_2.txt', 'Previous content is replaced by fs.writeFile()!', (err) => {
    if(err) throw err
    console.log('Content in "newfile_2.txt" is replaced!')
})


/**
 * Read files
 */
http.createServer((req, res) => {
  fs.readFile('demofile1.html', /*{"charset": "utf-8"},*/ (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(data)
    console.log('Log in call back...')
    res.end()
  })
  console.log('Log out call back...')
}).listen(8080)  

// fs.readFile('tested_file.txt', 'utf-8', function (err, data) {
fs.readFile('../pwclogo.png', function(err, data) {
    if (err) {
        // console.log(err);
        throw err;
    } else {  
        console.log(data);
        console.log(data.length + ' bytes.');
        console.log('Buffer -> String:' + data.toString('utf-8'));
        console.log('String -> Buffer:' + Buffer.from(data.toString('utf-8')), 'utf-8');
    }    
})


/**
 * Update
 * 1. fs.appendFile()  2. fs.writeFile()
 */
// The fs.appendFile() method appends the specified content at the end of the specified file
fs.appendFile('mynewfile1.txt', ' This is my text.', (err) => {
  if (err) throw err
  console.log('Updated! New content was appended.')
})

// The fs.writeFile() method replaces the specified file and content:
fs.writeFile('mynewfile3.txt', 'This is my text', (err) => {
  if (err) throw err
  console.log('Replaced! Pervious content was replaced.')
})


/**
 * Delete files
 */
// The fs.unlink() method deletes the specified file:
fs.unlink('temp.txt', (err) => {
    if(err) throw err
    console.log('File named \'temp.txt\' is deleted!')
})


/**
 * Rename files
 */
// The fs.rename() method renames the specified file to 'newfile_1_rename.txt'
fs.rename('newfile_1.txt', 'newfile_1_rename.txt', (err) => {
    if(err) throw err
    console.log('"newfile_1.txt" is renamed!')
})


/**
 * Event Loop Mechanism
 */
http.createServer((req, res) => {
  if(req.url != '/favicon.ico') {
    var userId = parseInt(Math.random()*8999) + 10000   // 产生一个随机五位数
    console.log('Welcome: ' + userId)
    // 此处的计算不是异步！可能造成Node.js的单线程阻塞
    /* for(var i=0; i>=0; i++) {
      console.log(i)
    } */
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    // 当有大量请求来读取大文件时，会出现上一个请求的文件读取还未完成，下一个请求就已到达，即多个同时请求的现象
    fs.readFile('./bigSizeFile.file', (err, data) => {
      if(err) throw err
      console.log(userId + 'read completed')
      res.end(data)
    })
  }
}).listen(3000, '192.168.41.30')

/**
 * 循环语句内包含异步操作的情况（解决方法：把异步变成同步）
 */
http.createServer((req, res) => {
  if(req.url != '/favicon.ico') {
    fs.mkdir('./album/travel')
    fs.stat('./album/shopping', (err, data) => {
      console.log(data.isDirectory())
    })
    var dirs = []   // arrays for all directories
    // fs.readdir() iterates all NAMES of files and dirs in album directory.
    fs.readdir('./album', (err, files) => {
      // files is an array representing the NAMES of files and directories under the './ablum' dir, './'代表相对于命令提示符所在目录的位置
      /**
       * Make Asncy to Sync : var -> let; immediate function(IIFE)
       * 这个立即执行函数可以定义到外部，但是第一次调用必须要在这个readdir方法的回调里面，即iterator定义在外部后，此处调用：iterator(0)
       */
      (function iterator(i) {
        if(i == files.length) {
          console.log(dirs)
          return
        }
        fs.stat('./album/'+files[i], (err, stats) => {
          if(stats.isDirectory()) {
            dirs.push(files[i])
          }
          iterator(i+1)
        })
      })(0)
      /* for(var i=0; i<files.length; i++) {
        fs.stat('./album/'+files[i], (err, stat) => {
          if(stats.isDirectory()) {
            dirs.push(files[i])
          }
          console.log(dirs)
        })
      } */
      res.end()
    })
  }
}).listen(3000, '127.0.0.1')


/**
 * Static Resources Management
 * 目前的实现方式上存在缓存问题：二次访问会产生304，要用cookie给请求的静态资源根据lastmodifiedtime打标记？
 */
http.createServer((req, res) => {
  var pathname = url.parse(req.url).pathname
  if(pathname.indexOf('.') == -1) {
    pathname += '/index.html'
  }
  var fileURL = './' + path.normalize('./static/' + pathname)
  console.log(fileURL)   // ./static\haha\xixi.html
  
  var extname = path.extname(pathname)
  fs.readFile(fileURL, (err, data) => {
    if(err) {
      fs.readFile('./static/404.html', (err, data) => {
        res.writeHead(404, {'Content-Type':'text/html;charset=utf-8'})
        res.end(data)
      })
      return
    }
    // MIME: text/html, image/jpg
    /* var mime = getMime(extname)   // getMime(extname)方法里面有异步操作，这里可能再其返回前执行以下代码
    res.writeHead(200, {'Content-Type':mime})
    res.end(data) */
    getMimeAsync(extname, (mime) => {
      res.writeHead(200, {'Content-Type':mime})
      res.end()
    })
  })
}).listen(3000)

var getMime = (extname) => {
  /*
  switch(extname) {
    case '.html':
      return 'text/html'
      // break   // Unreachable code detected
    case '.jpg':
      return 'image/jpg'
      // break
    case '.css':
      return 'text/css'
      // break
  }
  */

  // Read mime.json file
  fs.readFile('./mime.json', (err, data) => {
    if(err) {
      throw Error('Could not find the mime.json file!')
    }
    console.log(typeof data)   // object
    var mimeJSON = JSON.parse(data)
    return mimeJSON[extname]
  })
}

var getMimeAsync = (extname, callback) => {
  fs.readFile('./mime.json', (err, data) => {
    if(err) {
      throw Error('Could not find the mime.json file!')
    }
    var mimeJSON = JSON.parse(data)
    var mime = mimeJSON[extname] || 'text/plain'
    callback(mime)   // excute the callback function
  })
}

// File Server
http.createServer((req, res) => {
  var q = url.parse(req.url, true)
  var filename = "." + q.pathname
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
      //return res.end("404 Not Found")
      res.end("404 Not Found...")
    }  
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    res.write(data)
    //return res.end()
    res.end()
  })
}).listen(8080)


/**
 * Upload files
 */
// 1. Create an upload form
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
  res.write('<input type="file" name="filetoupload" /><br />')
  res.write('<input type="submit" />')
  res.write('</form>')
  return res.end()
}).listen(8080)

//2. Parse the uploaded file
var formidable = require('formidable')

http.createServer((req, res) => {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      res.write('File uploaded!')
      res.end()
    })
  } else if (req.url == '/demo.jpg') {
    fs.readFile('./demo.jpg', (err, data) => {
      res.writeHead(200, {'Content-Type':'image/jpg'})
      res.end(data)
    })
  } else {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
    res.write('<input type="file" name="filetoupload" /><br />')
    res.write('<input type="submit" />')
    res.write('</form>')
    return res.end()
  }
}).listen(8080)

// 3. Save the file
http.createServer((req, res) => {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      var oldpath = files.filetoupload.path
      var newpath = 'C:/Users/wzhou047/' + files.filetoupload.name
      fs.rename(oldpath, newpath, (err) => {
        if (err) throw err
        res.write('File uploaded and moved!')
        res.end()
      })
    })
  } else {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
    res.write('<input type="file" name="filetoupload" /><br />')
    res.write('<input type="submit" />')
    res.write('</form>')
    return res.end()
  }
}).listen(8080)