const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.htm'))
})

app.get('/video', function(req, res) {
  const path = 'assets/sample.mp4'
  // size of file to chunk
  const stat = fs.statSync(path) 
  const fileSize = stat.size

  // Subsequent requests are made, this time with the range in the header
  const range = req.headers.range
  // partial content can now be served
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1

    if(start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
      return
    }
    // Size of chunk
    const chunksize = (end-start)+1
    // A single chunk
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    // partial content status code
    res.writeHead(206, head)
    file.pipe(res)
  } else {
    // send the first few chunks of the video
    const head = {'Content-Length': fileSize,'Content-Type': 'video/mp4',}
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
