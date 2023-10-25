//* CRUD OPERATIONS IN MONGODB

//? 3: crete (Inserting the documents in collection)
//!methods like insert() and save() are being deprecated in favor of more explicit methods like insertOne() and insertMany()

//? 1.a insertOne(): This method inserts a single document into the collection.
// db.product.insertOne({ name: "vinod", age: 29 });

//? 1.b insertMany(): This method inserts an array of documents into the collection.
//! IMP - Argument "docs" must be an array of documents (use array always)
//db.product.insertMany([{'name':'vinod', 'age':29}, {'name':'arjun', 'age':'30'}])

//? Important when to use quotes and when to not
//Special Characters: If your field name contains special characters, spaces, or starts with a numeric digit, using quotes becomes necessary.
// Field name with spaces
// db.grades.find({"course name": "Math"})
// Field name starting with a digit
// db.grades.find({"1st_place": true})

//Reserved Words: If your field name is a reserved keyword in MongoDB (e.g., $group, $sum, etc.), you need to use quotes to distinguish it from the reserved keyword
// we will see when we will see comparison operator

//? 1.c Ordered Inserts vs Unordered Inserts
//In MongoDB, "ordered" and "unordered" refer to the behavior of a bulk write operation when multiple operations are included in a single batch. {ordered:1 or -1} By default it's true.  If any individual operation fails, MongoDB stops processing further operations in the batch and returns an error.

//? it's a example of ordered Inserts after the 2nd execution it will stop
// db.product.insertMany([
//   { name: "vinod", age: 29 },
//   { _id: ObjectId("64cb3ea5be4cb31d576182a3"), name: "sujan" },
//   { name: "naran", age: "30" },
// ]);

//? Unordered Inserts
// db.product.insertMany(
//   [
//     { name: "vinod", age: 29 },
//     { _id: ObjectId("64cb3ea5be4cb31d576182a3"), name: "sujan" },
//     { name: "ram", age: "30" },
//   ],
//   { ordered: false }
// );
//In this example, even though the 2nd operation fails due to the duplicate _id, MongoDB continues processing and returns a result object with information about both successful and failed operations.

//? 3: Case Sensitivity in MongoDB
//In MongoDB, collection names are case-sensitive. Therefore, db.Product and db.product are considered as two different collections. The same rule applies to field names within documents.
// db.Product.insertOne({name:"thapa",age:30})
// vs
// db.product.insertOne({name:"thapa",age:30})
// the output will be two collections 🤯
// dbproduct> show collections
// product
// Product
