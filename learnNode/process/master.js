const fs = require('fs');
const child_process = require('child_process');

for(var i=0; i<3; i++) {
	// EXEC, SPAWN & FORK
	// 1. The exec() method returns a buffer with a max size and waits for the process to end and 
	// tries to return all the buffered data at once.

	// 2. spawn() starts receiving the response as soon as the process starts executing.

	// 3. fork() returns an object with a built-in communication channel in addition to 
	// having all the methods in a normal ChildProcess instance.
	var worker_process = child_process.fork("task.js", [i]);	

	worker_process.on('close', function (code) {
	console.log('child process exited with code ' + code);
});
}
