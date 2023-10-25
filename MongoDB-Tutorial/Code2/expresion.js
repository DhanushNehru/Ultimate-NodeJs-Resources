//* Introduction to $expr
// The $expr operator in MongoDB allows you to use aggregation expressions within a query to compare fields from the same document. It's particularly useful when you need to perform more complex comparisons or calculations involving document fields.

//? The syntax is {$expr: {operator: [field, value] } }
// One important thing to remember is the field should be prefix with $ sign.
// db.products.find({$expr: {$gt: ['$price',1340] }})

//! Find sales where (quantity * price) is greater than targetPrice
db.sales.find({
  $expr: {
    $gt: [{ $multiply: ["$quantity", "$price"] }, "$targetPrice"],
  },
});

// here both the values are fields only for comparison thats why $ sign is used
