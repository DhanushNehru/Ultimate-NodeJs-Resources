// ********************************************
//* Aggregation Framework
// ********************************************

// The Aggregation Framework is a powerful feature in MongoDB that allows you to process and analyze data in a highly flexible and efficient manner. It provides a set of pipeline stages that enable you to perform data transformations, group data, and perform various calculations on collections.

// In MongoDB's aggregation framework, $match, $group, and $unwind are referred to as aggregation operators. They are used as stages in the aggregation pipeline to perform specific operations on the data.

//* Aggregation Operations
//? $match
//? The $match stage filters documents based on specified conditions.

//? Retrieve all products with a name = Sleek Wooden Tuna.

// db.products.aggregate([
//     {
//       $match: {
//         'name':'Sleek Wooden Tuna'
//       }
//     }
//   ])

//? Retrieve all products with a price greater than 50.
//   db.products.aggregate([
//     { $match: { price: { $gt: 50 } } }
//   ]);


💖 Thank You So Much For Choosing My Video 💖

Hi everyone,

I'm absolutely thrilled – we're almost at 600K subscribers for our MongoDB course! This course was a true labor of love, and it's been amazing to see how it's helping you all.

If you've enjoyed what we're doing and want to be part of our journey, hitting that Subscribe button would mean the world to me. Let's keep growing and learning together!
Here is the link: https://www.youtube.com/thapatechnical

With gratitude,
Thapa Technical 

//* $group
// The $group stage groups documents by specified fields and performs aggregation functions. it is like the reduce methods in JS

// when dealing with $group stage we need to pass $sign for our existing field not the one we are going to create
// syntax :
//  {
//   $group:
//     {
//       _id: <expression>, // Group key
//       <field1>: { <accumulator1> : <expression1> },
//       ...
//     }
//  }

// https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/group/#considerations

db.products.aggregate([
  { $match: { price: { $gt: 900 } } },
  {
    $group: {
      _id: { sameCompany: "$company" },
      totalPrice: { $sum: "$price" },
    },
  },
]);

// let's use another accumulator operations
// $avg

// find the quantity = 5, group them with same quantity and find the average price

db.sales.aggregate([{ $match: { quantity: { $eq: 5 } } }]);
// both are same
db.sales.aggregate([
  { $match: { quantity: 5 } },
  {
    $group: {
      _id: { quan: "$quantity" },
      avgPrice: { $avg: "$price" },
    },
  },
]);

//* $sort

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  {
    $group: {
      _id: "$category",
      totalPrice: { $sum: "$price" },
    },
  },
  { $sort: { totalPrice: 1 } },
]);

// $sort is like .sort() but you can even sort the values that you added in group. (Of course you can also sort before grouping or with any other values. But here you can even sort in ascending or descending based on number of products it has.

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  {
    $group: {
      _id: "$category",
      totalPrice: { $sum: "$price" },
    },
  },
  { $sort: { totalPrice: -1 } },
]);

//* $project

db.products.aggregate([
  {
    $project: {
      _id: 0,
      price: 1,
      name: 1,
    },
  },
]);

// We can use the $project stage to create new fields by applying expressions or transformations to existing fields. For example, you could calculate the discounted price as a new field:

db.products.aggregate([
  { $match: { price: { $gt: 1000 } } },
  {
    $project: {
      _id: 0,
      name: 1,
      originalPrice: "$price",
      disPrice: { $multiply: ["$price", 0.8] },
    },
  },
]);

// again we can add the sort here too

db.products.aggregate([
  { $match: { price: { $gt: 1000 } } },
  {
    $project: {
      _id: 0,
      name: 1,
      originalPrice: "$price",
      disPrice: { $multiply: ["$price", 0.8] },
    },
  },
  { $sort: { disPrice: -1 } },
]);

//* $push and $unwind
//? Find documents with a price greater than 1200, then group them by price and create an array of colors for each group.

//* Before
//* if price = 1250 =>  colors: [ '#000000', '#cc6600', '#663300' ],
//* if price = 1250 =>  colors: [ '#fff000', '#ddddd', '#663300' ],

//? After,  I need a new document where
{
  price: 1250,
  allColors: ['#000000', '#cc6600', '#663300', '#fff000', '#ddddd', '#663300' ]
}

// code
db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  {
    $group: {
      _id: { priceGroup: "$price" },
      colors: { $push: "$colors" },
    },
  },
]);

//* $unwind

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      colors: { $push: "$colors" },
    },
  },
]);

//?  Before
{
  _id: ObjectId("64c23601e32f4a51b19b9263"),
  name: 'Laptop Pro',
  company: '64c23350e32f4a51b19b9231',
  price: 1299,
  colors: [ '#333333', '#cccccc', '#00ff00' ],
  image: '/images/product-laptop.png',
  category: '64c2342de32f4a51b19b924e',
  isFeatured: true
},

//! $unwind: '$colors';
//? the $unwind stage deconstructs the "colors" array, creating multiple documents for each color within a product.

//?  After
{
  _id: ObjectId("64c23601e32f4a51b19b9263"),
  name: 'Laptop Pro',
  company: '64c23350e32f4a51b19b9231',
  price: 1299,
  colors: '#333333',
  image: '/images/product-laptop.png',
  category: '64c2342de32f4a51b19b924e',
  isFeatured: true
},

// {
//   _id: ObjectId("64c23601e32f4a51b19b9263"),
//   name: 'Laptop Pro',
//   company: '64c23350e32f4a51b19b9231',
//   price: 1299,
//   colors: '#cccccc',
//   image: '/images/product-laptop.png',
//   category: '64c2342de32f4a51b19b924e',
//   isFeatured: true
// },

// so now all the colors are in a string format, so $push will add them as an element in an array of colors

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: null,
      totalCount: { $sum: 1 },
    },
  },
]);

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      colors: { $push: "$colors" },
    },
  },
]);

//* $addToSet
// still there is a problem and that is we are also getting the duplicates values so to remove it we will use the $addToSet

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      colors: { $addToSet: "$colors" },
    },
  },
]);

//* $size
// What If we want to count the number of unique colors for each price group
db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      colors: { $addToSet: "$colors" },
      colorLength: { $size: "$colors" },
    },
  },
]);

// we can't do this, bcz the $size operator is not allowed directly within the $group stage. Instead, you can use it in combination with other aggregation operators or in separate pipeline stages.

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      allColors: { $addToSet: "$colors" },
    },
  },
  {
    $project: {
      _id: 1,
      allColors: 1,
      colorLength: { $size: "$allColors" },
    },
  },
  { $limit: 1 },
]);

//! very Important in project stage we are only getting two fields and the name of the fields has to match with the fields names in group stage. ex. allColors fields

//* limit

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      allColors: { $addToSet: "$colors" },
    },
  },
  {
    $project: {
      _id: 1,
      allColors: 1,
      colorLength: { $size: "$allColors" },
    },
  },
  { $limit: 1 },
]);

//* skip

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      allColors: { $addToSet: "$colors" },
    },
  },
  {
    $project: {
      _id: 1,
      allColors: 1,
      colorLength: { $size: "$allColors" },
    },
  },
  { $skip: 1 },
]);

//* $filter
db.col.aggregate([
  {
    $project: {
      name: 1,
      values: {
        $filter: {
          input: "$values",
          as: "value",
          cond: { $gt: ["$$value", 30] },
        },
      },
    },
  },
]);
