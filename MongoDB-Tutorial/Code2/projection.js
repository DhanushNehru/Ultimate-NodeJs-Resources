//* Projection
// Which filed to display which not, only the _id is needs to be explicitly defined so that the _id won’t be included in our output.

// Including Specific Fields: To include only specific fields in the query result, you can use the projection with a value of 1 for the fields you want to include.
// db.products.find({}, { name:1, price:1}).limit(2)

// Excluding Specific Fields:To exclude specific fields from the query result, you can use the projection with a value of 0 for the fields you want to exclude.

// db.products.find({}, {_id:0, name:1, price:1}).limit(2)

//! We cannot include and exclude fields in the same query projection in MongoDB. It's either inclusion or exclusion, not both simultaneously.
// db.products.find({}, { _id: 0, name: 1, price: 1, price: 0 }).limit(2);
