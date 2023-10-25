//* Delete
//? In MongoDB, the DELETE operations are used to remove documents from a collection. There are two main methods to perform deletion: deleteOne() and deleteMany().

//* Delete a Single Document:
//? syntax : db.collectionName.deleteOne({ _id: ObjectId("12345") });
// db.sales.deleteOne({ _id: 1 });

//* Delete Multiple Documents:
//? Syntax: db.collectionName.deleteMany({ field: "value" });
// db.sales.deleteMany({'price':55})
