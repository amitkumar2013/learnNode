# learnNode

Node.js is a very powerful JavaScript-based `platform` or `runtime environment` built on Google Chrome's **JavaScript V8 Engine** with `JavaScript Libraries`. It is event-driven and runs across distributed devices. It is used to develop I/O intensive/fast and scalable(although single threaded) network/web applications like 

- video streaming sites, 
- single-page applications, and 
- other web/JSON APIs based applications. 
- It is not advisable to use Node.js for CPU intensive applications.

Every API of Node.js is asynchronous and being single-threaded, they use async function calls to maintain concurrency. Any async function accepts a callback as the last parameter and a callback function accepts an error as the first parameter.

## Usage

$ node <file-name>.js
	or
$ nodemon <file-name>.js

## Modules

REPL environment -- Read Eval Print Loop

In built modules:

events	To handle events
fs	To handle the file system
http	To make Node.js act as an HTTP server
url	To parse URL strings
os	Provides information about the operation system
path	To handle file paths

https	To make Node.js act as an HTTPS server.
tls	To implement TLS and SSL protocols
querystring	To handle URL query strings
readline	To handle readable streams one line at the time
stream	To handle streaming data

buffer	To handle binary data
child_process	To run a child process
cluster	To split a single Node process into multiple processes
crypto	To handle OpenSSL cryptographic functions
dns	To do DNS lookups and name resolution functions
net	To create servers and clients
punycode	Deprecated. A character encoding scheme
string_decoder	To decode buffer objects into strings
timers	To execute a function after a given number of milliseconds
tty	Provides classes used by a text terminal
util	To access utility functions
v8	To access information about V8 (the JavaScript engine)
vm	To compile JavaScript code in a virtual machine
zlib	To compress or decompress files

### Web Server
There are 3 server libraries to choose from 'open', 'http' & 'express'.

### Packaging
use JXcore

$ jx package `**/*.js` <package-name>
$ jx <package-name>.jx



