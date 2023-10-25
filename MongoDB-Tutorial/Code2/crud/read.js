//? Read Operations

//* 2.a find(): The find() method is the most common way to retrieve documents from a collection. It allows you to specify query conditions to filter the documents you want to retrieve.
//? syntax => db.collection_name.find({key:value})
// db.product.find({ name: "vinod" });
// db.product.find({'age':29})

//* 2.b findOne(): The findOne() method returns a single document that matches the specified query condition. It's useful when you only need to retrieve one document.
//? syntax => db.collection_name.findOne({key:value})
// db.product.findOne({ age: 29 });
// db.product.findOne({'name':'vinod'})

//* MONGOIMPORT
// Now I will show How to import data from json file
//? mongoimport E:\\mongo\products.json -d shop -c products

// mongoimport E:\\mongo\products.json -d shop -c products --jsonArray

//! Failed: error reading separator after document #1: bad JSON array format - found no opening bracket '[' in input source

// mongoimport E:\mongo\mongo_json\sales.json -d tshop -c sales --jsonArray

// mongoexport -c sales -d shop -o E:\mongo\sales1.json

// mongoexport --collection=sales --db=shop -out=E:\mongo\sales.json
