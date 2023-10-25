//* Updates

//? 1: Updating a Single Field:
//*  db.collectionName.updateOne(
//    { _id: ObjectId("12345") },
//   { $set: { fieldName: "new value" } }
//  );

//? Update the price value = 45 in a products collections, where the _id = ObjectId("64c2363be32f4a51b19b9271")

//? Update the isFeatures value = true in a products collections, where the name = Designer Handbag

//* UpdateMany
//? Update all the isFeatures value = true in a products collections, where the  price = 120

//* Updating multiple fields in a document
// db.collectionName.updateOne(
//   { _id: ObjectId("12345") },
//   {
//     $set: {
//       field1: "new value 1",
//       field2: "new value 2",
//     },
//   }
// );

//? Update the price = 154 and isFeatures = false fields from the products collections where the name =  Unbranded Frozen Chicken.

//* Renaming a field in a document.
// syntax:  db.collectionName.updateOne(
//     { _id: ObjectId("12345") },
//     { $rename: { oldFieldName: "newFieldName" } }
//   );
//? Rename the products collection isFeatured field to isFeature, where the price = 123

//* Adding a new field in a document
// db.collectionName.updateOne(
//     { _id: ObjectId("12345") },
//     { $set: { newField: "new value" } }
//   );

//* Removing or Deleting the Field in a document
// To remove a field from documents in MongoDB, you can use the $unset update operator.
// db.collectionName.updateOne(
//     { _id: ObjectId("12345") },
//     { $unset: { fieldName: 1 } }
//   );

//* Update Embedded Documents
//? How do you add a new element to an array using the $push operator?
// db.collectionName.updateOne(
//     { _id: ObjectId("12345") },
//     { $push: { arrayField: "new element" } }
//   );

//? Popping from an Array: Removing the last element from an array in a document.
// Syntax:  db.collectionName.updateOne(
//   { _id: ObjectId("12345") },
//   { $pop: { arrayField: 1 } }
// );

//? Updating a field within an embedded document.

//? Update the text value within an comments array = "Awesome article!", where the id=7 & username=alice.

// Consider this part of the query: 'comments.$.text': 'Awesome Thapa!'

// comments is the name of the array field.
// $ is the positional operator, and it refers to the index of the array element that matches the query condition.
// text is the field within the specific comment element that you want to update.
