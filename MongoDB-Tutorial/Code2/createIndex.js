// ********************************************
//* Index
// ********************************************
// lets query to see total count of products greater than 100:
// db.products.find({ price: { $gt: 100 } }).count();

//? We can use explain() method to understand it more better
//? Also we can add explain('executionStats') to understand more in depth

//? Find name= air fryer from the products collections
// db.products.explain('executionStats').find({'name':'Air Fryer'})
//! executionTimeMillis: 18,

//* Creating Indexes
//? Indexes can be created using the createIndex() method.
//? syntax: db.collectionName.createIndex({ fieldName: 1 });
//? In this case, 1 represents ascending order, and -1 would be descending order.

// db.products.createIndex({name:1})
//! executionTimeMillis: 8

//* Getting Indexes
// db.products.getIndexes();
//?Did you realize that _id is already there? _id is automatically added by mongodb and it’s a default unique index.

//* Removing an index
// db.products.dropIndex({ name: 1 });

//* Creating a unique index
// db.users.createIndex({ email: 1 }, { unique: true });

//* When not to use indexes?

// Indexes can actually slow things down in some conditions, it usually slows things down if your query is going to return huge amounts of data.  It’s unnecessary to use indexes everywhere.

// For example
// db.products.explain('executionStats').find({price: {$gt: 100}});
// The think it is returning almost 90% of data in output
// nReturned: 9216,

// let create the index for the Price
// db.products.createIndex({price:1})

// Now lets check the time its taking
// executionTimeMillis: 26, it is taking almost double time
