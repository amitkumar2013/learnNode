var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

  // Create collection; 
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  // for dropping either dbo.collection("customers").drop(func...
  // or dbo.dropCollection("cust...

  // Insert
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });

  // Batch
  var myobj = [
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'},
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: 'Valley 345'},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: 'Sky st 331'},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
  ];
  dbo.collection("customers").insertMany(myobj, function(err, result) {
    if (err) throw err;
    console.log("Number of documents inserted: " + result.insertedCount);
    db.close();
  });

  // Select
  dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });

  // findAll
  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
  // .find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(func...
  // .find({ address: "Park Lane 38" }).toArr...
  // .find({ address: /^S/ }).sort({ name: 1 }).limit(5).toArr...

  // .delete[One|Many]("{ address: 'Mountain 21' }", function(err, obj) {
  // .... obj.result.n ...	

  // .updateOne(myquery, newvalues, func...
  // .updateMany(myquery, newvalues, func...

  // .aggregate([{ $lookup:{from:'products',localField:'product_id',foreignField:'_id',as: 'orderdetails'}}]).toArr...
});