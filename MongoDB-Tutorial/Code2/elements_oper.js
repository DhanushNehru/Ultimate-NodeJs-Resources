//* Elements Operator
// In MongoDB, element operators are used to query documents based on the existence, type, and values of fields within the documents. These operators help you work with fields that are arrays, null, missing, or have specific data types.

//? 1: $exists: Matches documents that have a specific field, regardless of its value.

// db.products.find({ price: { $exists: true } }).count();

// Find documents with the "price" field present, and if it's present then check the value greater then 1200

// db.products.find({ price: { $exists: true },cls price: { $gt: 1250 } });

//? 2: $type: The $type operator filters documents based on the BSON data type of a field.
// Basically we need to search or find the fields based on types (BSON Type) for example

// db.products.find({ price: { $type: "string" } });
// result will be 0, bcz the price type is number
// db.products.find({ price: { $type: "number" } }).count()

// 1: Double
// 2: String
// 3: Object
// 4: Array
// 5: Binary data
// 6: Undefined
// 7: Object id
// 8: Boolean
// 9: Date
// 10: Null
// 11: Regular expression
// 12: JavaScript code
// 13: Symbol
// 14: JavaScript code with scope
// 17: 64-bit integer

// db.products.find({ price: { $type: "string" } });
// result will be 0, bcz the price type is number
// db.products.find({ price: { $type: "number" } }).count()

//? 3: $size: The $size operator matches documents where the size of an array field matches a specified value.
// db.comments.find({comments: {$size:2}})
