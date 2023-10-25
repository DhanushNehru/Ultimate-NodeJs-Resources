//* Embedded Documents (Dealing with Arrays & Object)

//* Just use the dot notations, that’s it

// ?1:  Find posts with comments by a specific user (Array)
// db.comments.find({'comments.user': 'Alice'})

//? 2: Find the documents where the views in metadata field > 1200. (Object)
// db.comments.find({ "metadata.views": { $gt: 1200 } });

//? 3: we need to find out the document where the user in comments = Henry and also the in the metadata likes value > 50.
// db.comments.find({ 'comments.user':'Henry' , 'metadata.likes':{$gt: 50}  })

//? 4:we need to return an comments array which must have this two (user = alice & vinod) elements only in it.
//! We need to use $all operator. Here the order doesn’t’ matter.

// db.comments.find({ "comments.user": { $all: ["Alice", "Vinod"] } });
// db.comments.find({'comments.user': {$all: ['Alice','Vinod','Bob']}})

//? 5:  In Array for multiple querying we user $elemMatch operator.
//* Here is the syntax: {field: {$elemMatch: { {query1},{query2}..  }}}
// db.comments.find({ comments: {$elemMatch: {'user':'Alice' , 'text':'Awesome article!'  } }  })
//? by the wat you can write the same using simple way
// db.comments.find({ 'comments.user':'Alice' , 'comments.text':'Awesome article!'  } )
