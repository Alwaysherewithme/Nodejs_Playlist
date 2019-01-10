'use strict'

var MongoClient = require('mongodb').MongoClient
var url_1 = "mongodb://localhost:27017/ourdb"
var url_2 = "mongodb://localhost:27017/"


/**
 * Create a database called "ourdb":
 * In MongoDB, a database is not created until it gets content!
 * MongoDB waits until you have created a collection (table), 
 * with at least one document (record) before it actually creates the database (and collection).
 */
MongoClient.connect(url_1, (err, db) => {
    if (err) throw err
    console.log("Database created!")
    db.close()
})

MongoClient.connect(url_2, (err, db) => {
    if (err) throw err
    // Create a database called "mydb":
    var dbo = db.db("mydb")

    /**
     * Create a collection:
     * In MongoDB, a collection is not created until it gets content!
     * MongoDB waits until you have inserted a document before it actually creates the collection.
     */
    dbo.createCollection("customers", (err, res) => {
        if (err) throw err
        console.log("Collection created!")
    })
    
    /**
     * Insert Document(s)
     * 
     * insertOne()
     * insertMany()
     */
    var myobj = { name: "Company Inc", address: "Highway 37" }
    dbo.collection("customers").insertOne(myobj, (err, res) => {
        if (err) throw err
        console.log("1 document inserted")
        db.close()
    })

    var myobj = [
        { name: 'John', address: 'Highway 71'},
        /**
         * The _id Field:
         * 
         * If you do not specify an _id field, then MongoDB will add one for you and assign a unique id for each document.
         * If you do specify the _id field, the value must be unique for each document:
         */
        // { _id: 154, name: 'John', address: 'Highway 71},
        { name: 'Peter', address: 'Lowstreet 4'},
        { name: 'Amy', address: 'Apple st 652'},
        { name: 'Viola', address: 'Sideway 1633'}
    ]

    dbo.collection("customers").insertMany(myobj, (err, res) => {
        if (err) throw err
        /**
         * The Result Object:
         * When executing the insertMany() method, a result object is returned. The result object contains information about how the insertion affected the database.
         * The object returned from the example above looked like this:
            {
                result: { ok: 1, n: 4 },
                ops: [
                    { name: 'John', address: 'Highway 71', _id: 58fdbf5c0ef8a50b4cdd9a84 },
                    ...
                    { name: 'Viola', address: 'Sideway 1633', _id: 58fdbf5c0ef8a50b4cdd9a91 } ],
                insertedCount: 4,
                insertedIds: [
                    58fdbf5c0ef8a50b4cdd9a84,
                    ...
                    58fdbf5c0ef8a50b4cdd9a91 ]
            }
         */
        console.log("Number of documents inserted: " + res.insertedCount)
        db.close()
    })

    /**
     * Find Document(s)
     * 
     * findOne(queryObject, ...) returns the first occurrence in the selection
     * findAll(queryObject) returns all occurrences in the selection
     */
    dbo.collection("customers").findOne({}, (err, result) => {
        if (err) throw err
        console.log(result.name)
        db.close()
    })

    dbo.collection("customers").find({}).toArray((err, result) => {
        if (err) throw err
        console.log(result)
        db.close()
    })
    
    /**
     * Find Some
     * 
     * find(queryObject, {projection:{...}})
     * The second parameter of the find() method is the projection object that describes which fields to include in the result.
     * This parameter is optional, and if omitted, all fields will be included in the result.
     * You are not allowed to specify both 0 and 1 values in the same object (except if one of the fields is the _id field). If you specify a field with the value 0, all other fields get the value 1, and vice versa
     * 
     * { projection: { _id: 0, name: 1, address: 1 } }
     * Return the fields "name" and "address" of all documents in the customers collection
     * 
     * { projection: { _id: 0 } }
     * return all fields except the _id field
     * 
     * { projection: { address: 0 } }
     * exclude "address" from the result:
     * 
     * { projection: { _id: 0, name: 1 } }
     * return only the "name" field:
     */
    dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray((err, result) => {
        if (err) throw err
        /**
         * The Result Object
         * the result can be converted into an array containing each document as an object.
         */
        console.log(result)
        console.log(result[2].address)
        db.close()
    })

    /**
     * Filter the Result
     * 
     * The first argument of the find() method is a query object, and is used to limit the search.
     * 
     * Filter With Regular Expressions
     * Regular expressions can only be used to query strings
     */
    var query = { address: "Park Lane 38" }   // Find documents with the address "Park Lane 38":
    var query = { address: /^S/ }   // Find documents where the address starts with the letter "S":
    dbo.collection("customers").find(query).toArray((err, result) => {
        if (err) throw err
        console.log(result)
        db.close()
    })

    /**
     * Sort the Result
     * 
     * The sort() method takes one parameter, an object defining the sorting order
     */
    var ascSort = { name: 1 }   // ascending
    var descSort = { name: -1 }   // descending
    dbo.collection("customers").find().sort(ascSort).toArray((err, result) => {
        if (err) throw err
        console.log(result)
        db.close()
    })
    
    /**
     * Delete Document(s)
     * 
     * deleteOne(queryObject, ...)
     * Note: If the query finds more than one document, when using deleteOne(), only the first occurrence is deleted.
     * 
     * deleteMany(queryObject, ...)
     */
    var deleteOneQuery = { address: 'Mountain 21' }   // Delete the document with the address "Mountain 21":
    dbo.collection("customers").deleteOne(deleteOneQuery, (err, obj) => {
        if (err) throw err
        console.log("1 document deleted")
        db.close()
    })
    
    var deleteManyQuery = { address: /^O/ }   // Delete all documents were the address starts with the letter "O":
    dbo.collection("customers").deleteMany(deleteManyQuery, (err, obj) => {
        if (err) throw err
        // The Result Object: { n: 2, ok: 1 }
        console.log(obj.result.n + " document(s) deleted")
        db.close()
    })

    /**
     * Drop Collection
     * 
     * drop()
     * takes a callback function containing the error object and the result parameter which returns true if the collection was dropped successfully, otherwise it returns false.
     * 
     * dropCollection()
     * takes two parameters: the name of the collection and a callback function
     */
    dbo.collection("customers").drop((err, delOK) => {
        if (err) throw err
        if (delOK) console.log("Collection deleted")
        db.close()
    })

    dbo.dropCollection("customers", (err, delOK) => {
        if (err) throw err
        if (delOK) console.log("Collection deleted")
        db.close()
    })


    /**
     * Update Document(s)
     * 
     * updateOne(queryObject, newValuesObject, ...)
     * Note: If the query finds more than one record, when using updateOne(), only the first occurrence is updated.
     * 
     * 
     * updateMany()
     */
    var updateQuery = { address: "Valley 345" }
    var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } }   // $set: only the specified fields are updated
    dbo.collection("customers").updateOne(updateQuery, newvalues, (err, res) => {
        if (err) throw err
        console.log("1 document updated")
        db.close()
    })

    var myUpdateQuery = { address: /^S/ }
    var myNewvalues = { $set: {name: "Minnie"} }
    dbo.collection("customers").updateMany(myUpdateQuery, myNewvalues, (err, res) => {
        if (err) throw err
        /**
         * The Result Object: { n: 1, nModified: 2, ok: 1 }
         */
        console.log(res.result.nModified + " document(s) updated")
        db.close()
    })

    /**
     * Limit the Result
     * 
     */
    dbo.collection("customers").find().limit(5).toArray((err, result) => {
        if (err) throw err
        console.log(result)   // only the 5 first documents were returned
        db.close()
    })

    /**
     * Join Collections
     * MongoDB is not a relational database, but you can perform a left outer join by using the $lookup stage.
     * he $lookup stage lets you specify which collection you want to join with the current collection, and which fields that should match.
     * Consider you have a "orders" collection and a "products" collection:
     * 
     * orders: [{ _id: 1, product_id: 154, status: 1 }]
     * products: [
            { _id: 154, name: 'Chocolate Heaven' },
            { _id: 155, name: 'Tasty Lemons' },
            { _id: 156, name: 'Vanilla Dreams' }
        ]
     */
    dbo.collection('orders').aggregate([
        { $lookup:
           {
             from: 'products',
             localField: 'product_id',
             foreignField: '_id',
             as: 'orderdetails'
           }
        }
        ]).toArray((err, res) => {
            if (err) throw err
            console.log(JSON.stringify(res))
            /**
             * res:
             * 
             * [
                { "_id": 1, "product_id": 154, "status": 1, "orderdetails": [
                  { "_id": 154, "name": "Chocolate Heaven" } ]
                }
                ]
             */
            db.close()
      })

})
