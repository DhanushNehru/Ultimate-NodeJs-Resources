//* Comparison Operators

//? 1 $eq: Matches values that are equal to the specified value.
// db.products.find({'price': {$eq:699}})

//? 2: $ne: Matches values that are not equal to the specified value.
// db.products.find({'price': {$ne:699}}).count()

// 3: $gt: Matches values that are greater than the specified value.
// db.products.find({'price': {$gt:699}})

// 4: $gte: Matches values that are greater than or equal to the specified value.
// db.products.find({'price': {$gte:699}})

// 5: $lt: Matches values that are less than the specified value.
// db.products.find({'price': {$lt:699}})

// 6: $lte: Matches values that are less than or equal to the specified value.
// Find products with price less than or equal to 699
// db.products.find({'price': {$lte:699}})

// $in: Matches values that are within the specified array.
// db.products.find({'price': 129, 'price':39})
// db.products.find({'price': {$in: [129,39]}})
//? Now here I will go with different collection
// db.category.find({ name: { $in: ["Travel & Luggage", "Home & Kitchen"] } });

//? $nin: Matches values that are not within the specified array.
// db.products.find({'price': {$nin: [249,129,39]}}).count()
