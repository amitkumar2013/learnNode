// custom module; modules can be assigned to variables.
var dt = require('../basic/myfirstmodule');
var url = require('url');

//module `express`
const express = require('express')
const app = express()
// built-in middleware express.static to serve static files, such as images, CSS, JavaScript, etc.
app.use(express.static('public'));

// for uploading
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var multer  = require('multer');
// Storage is more powerful than dest
// var upload = multer({ dest: 'uploaded/'}); 
// Or
// Use MemoryStorage or DiskStorage
var storage = multer.diskStorage({
	// which folder to store: default is temp
    destination: function(req, file, cb) {
        cb(null, './uploaded');
     },
    // name: default is random string minus extension
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var upload = multer({ storage: storage })

var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get('/', (req, res) => {

	console.log("Cookies: ", req.cookies);
	
	// res.send('Hello World! from Node.js'); // Stream is closed
	// Or
	res.writeHead(200, {'Content-Type': 'text/html'});
	console.log('GET received: '+req.url);

	// ALL ABOUT URL MODULE
	var adr = 'http://localhost:3000/default.htm?var1=value1&var2=value2';
	var q = url.parse(adr, true); // adr == req.url
	var txt = q.host+' '+q.pathname+' '+q.search;

	var obj = q.query;
	console.log(obj);// What's the type here???
	var param = q.query.var1;
	console.log("with query param "+param);

	res.write("Date from custom module: " + dt.myDateTime() + "<br/>");
	res.end(txt); // Stream is closed - parameter is optional
});

// OTHER METHODS
app.get('/index.*', function (req, res) {
	console.log('GET for index page');
   res.sendFile( __dirname + "/../" + "index.html" );
})
app.get('/process', function (req, res) {
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log('GET received: '+response);
   res.end(JSON.stringify(response));
})
app.post('/', function (req, res) {
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log('POST received: '+response);
   res.send('Hello POST');
})
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// Multer adds a body object and a file or files object to the request object. 
// The body object contains the values of the text fields of the form, 
// the file or files object contains the files uploaded via the form.
app.post('/single', upload.single('singleFile'), (req, res) => {
	try {
		res.send(req.file); // Single
	}catch(err) {
		res.send(400);
	}
});
// 4 files at max: here
app.post('/bulk', upload.array('multiFile', 4) , (req, res) =>{
	try {
	    res.send(req.files); // Multiple
	} catch(error) {
		console.log(error);
		res.send(400);
	}
});

app.listen(3000, () => 
	console.log('Example app listening on port 3000!'))
