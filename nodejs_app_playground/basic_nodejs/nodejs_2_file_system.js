'use strict'

// The Built-in File System
var fs = require('fs')
var http = require('http')
var url = require('url')



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
  fs.readFile('demofile1.html', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(data)
    res.end()
  })  
}).listen(8080)  

// fs.readFile('tested_file.txt', 'utf-8', function (err, data) {
fs.readFile('../pwclogo.png', function(err, data) {
    if (err) {
        console.log(err);
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