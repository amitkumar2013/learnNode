var http = require('http');
var fs = require('fs'); // File System module
var events = require('events'); // Event module

http.createServer(function handler(req, res) {
	
	// ALL ABOUT FS MODULE
	fs.readFile('./data/sample.html', function(err, data) {
    	res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write(data);
    	return res.end();
  	});
	// Above continues to process async; whereas latter is blocking
	var data = fs.readFileSync('./data/sample.html');


	// Creates if not there -- unlink() for deletion
	// MODES: r, r+ - read write, rs - read sync, w, w+, wx, a - append, a+, ax+ - x is fail if missing.
 	var openfile = fs.open('./data/mynewfile1.txt', 'w', '0666', function (err, file) {
  		if (err) throw err;
  		console.log('Opened!');
	});
	var open_file_timeout = setTimeout(openfile, 2000); // milli-seconds
	// condition based: clearTimeout(open_file_timeout);
	setInterval(updatefile, 2000); // This is like delay


	// .appendFile() for update else .writeFile() for replace
  	var updatefile = fs.appendFile('./data/mynewfile2.txt', 'Hello content!', function (err) { 
  		if (err) throw err;
  		console.log('Saved!');
	});
  	// there is .rename(old,new,...)

  	// ALL ABOUT STREAMS
  	// Event based reading is also there - only on stream objects
  	// Readable, Writable, Duplex[rw], Transform
  	var rs = fs.createReadStream('./data/mynewfile2.txt');
	rs.setEncoding('UTF8');
	rs.on('open', function () {
	  console.log('The file stream is open');
	});
	// Events are: data, finish, end & error e.g.
	// rs.on('data', func...)
	// rs.on('finish', func...)
	// rs.on('end', func...)
	// rs.on('error', func...)

	// Chain/Pipe : read_s1.pipe(write_s2).pipe(write_s3);

	// Other file operations: fs.ftruncate, fs.mkdir, fs.readdir, fs.rmdir 

	// ALL ABOUT EVENT MODULE
	var eventEmitter = new events.EventEmitter();
	//Create an event handler:
	var myEventHandler = function () {
	  console.log('I hear a scream!');
	}
	// Assign 
	eventEmitter.on('scream', myEventHandler);
	//Fire the event:
	eventEmitter.emit('scream');
	// Others being : once(), listeners(), [add|remove]Listener, setMaxListeners(n)

	// Buffer is outside the V8 heap - StringBuffer
	var buf = new Buffer.alloc(256);
	var len = buf.write("Simply Easy Learning");
	// buf.toString([encoding][, start][, end])
	console.log("Octets written : "+  len + ' with space ' + buf.length);
	var json = buf.toJSON(buf);
	console.log(json);
	// Buffer.concat(list[, totalLength]) or buf.slice([start][, end])
	// buf.compare(otherBuffer);
	// buf.copy(targetBuffer[, targetStart][, sourceStart][, sourceEnd])

}).listen(3000);

console.log('Server running at http://localhost:3000/');
