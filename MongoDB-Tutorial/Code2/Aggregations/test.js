db.produts.aggregate([
  {
    $group: {
      _id: "$company",
      totalProducts: { $sum: "$price" },
    },
  },
]);

db.products.aggregate([
  {
    $match: {
      _id: "64c23350e32f4a51b19b9247",
    },
  },
]);


price > 900
company $group
sum price

db.produts.aggregate([
    {
        $match: {price: {$gt: 900}}
    },
    {
      $group: {
        _id: "$company",
        totalProducts: { $sum: "$price" },
      },
    },
  ]);
  
//!   find the quantity = 5, group them with same quantity and find the average price

db.sales.aggregate([
    { $match: {quantity:5} },
    {
        $group: {
            _id: '$quantity',
            priceTotal: {$sum: '$price'},
            pricrAvg: {$avg:'$price'}
        }
    }
])

db.products.aggregate([
    { $match: { price: { $gt: 1200 } } },
    {
      $group: {
        _id: "$category",
        totalPrice: { $sum: "$price" },
      },
    },
    {
        $sort: {totalPrice: 1}
    }
  ]);


  db.products.aggregate([
    { $match: { price: { $gt: 1200 } } },
    {
        $project: {
            price:1,
            discountPrice: {$multiply: ['$price', 0.8]}
        }
    }
  ])

  db.products.aggregate([
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: '$price',
            allColors: { $push :'$colors'}
        }
    }
  ])

  price: 1999,
  colors: [ '#000000', '#cc6600', '#663300' ]

  price: 1999,
  colors: [ '#000000', '#cc6600', '#663300' ]


  price: 1999,
  colors: [
    [ '#000000', '#cc6600', '#663300' ],
    [ '#000000', '#cc6600', '#663300' ]
  ]
  ,
  price: 1999,
  colors: ['#000000', '#cc6600', '#663300']

  db.products.aggregate([
    { $unwind: '$colors' },
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: '$price',
            allColors: { $push :'$colors'}
        }
    }
  ])

  db.products.aggregate([
    { $unwind: '$colors' },
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: '$price',
            allColors: { $addToSet :'$colors'}
        }
    }
  ])

  db.products.aggregate([
    { $match: { price: { $gt: 1200 } } },
    { $unwind: "$colors" },
    {
      $group: {
        _id: { priceGroup: "$price" },
        colors: { $addToSet: "$colors" },
      },
    },
    {
        $project:{
            _id:1,
            colors:1,
            colorLength: { $size: "$colors" },
        }
    },
   {
    $limit: 1
   }
  ]);


  db.col.insertMany([
    {
      _id: "64c23350e32f4a51b19b9201",
      name: "Document 1",
      values: [10, 20, 30, 40, 50],
    },
    {
      _id: "64c23350e32f4a51b19b9202",
      name: "Document 2",
      values: [15, 25, 35, 45, 55],
    },
    {
      _id: "64c23350e32f4a51b19b9203",
      name: "Document 3",
      values: [5, 15, 25, 35, 45],
    },
    {
      _id: "64c23350e32f4a51b19b9204",
      name: "Document 4",
      values: [30, 40, 50, 60, 70],
    },
    {
      _id: "64c23350e32f4a51b19b9205",
      name: "Document 5",
      values: [25, 35, 45, 55, 65],
    },
  ]
)


db.col.aggregate([{
    $project:{
        name:1,
        thapaValue: {
            $filter:{
                input: '$values',
                as: 'val',
                cond: {$gt: ['$$val', 30]}
            }
        }
    }
}])