//the following code was imported from the exercises done at class

//requesting mongo uri and importing database
const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const DB_NAME = "bugtracker";
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true};

module.exports = () => {
    //counts the elements from a collection with or without a query to filter docs
    const count = (collectionName, query = {}) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                if(err){
                    console.log("<<< Error while trying to connect to DB >>>");
                    return reject(err);
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.countDocuments(query, (err, docs) => {
                    if(err){
                        console.log("<<< Error while trying to count docs >>>");
                        return reject(err);
                    }
                    resolve(docs);
                    client.close();
                });
            });
        });
    };

    //finds docs from a specific collection with or without a query to filter them
    const get = (collectionName, query = {}) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                if(err){
                    console.log("<<< Error while trying to connect to DB >>>");
                    return reject(err);
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                
                collection.find(query).toArray((err,docs)=>{
                    if(err){
                        console.log("<<< Error while trying to find >>>");
                        reject(err);
                    }
                    resolve(docs);
                    client.close();
                });                
            });
        });
    };
    
    //performs an insert to the database using the collection and the information sent as a parameter
    const add = (collectionName, item) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                if(err){
                    console.log("<<< Error while trying to connect to DB >>>");
                    return reject(err);
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.insertOne(item, (err,result)=>{
                    if(err){
                        console.log("<<< Error while trying to insert >>>");
                        reject(err);
                    }
                    resolve(result);
                    client.close();
                });
            });
        });
    };    

    //performs an update to the database 
    const edit = (collectionName, query, updates) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                if(err){
                    console.log("<<< Error while trying to connect to DB >>>");
                    return reject(err);
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.findOneAndUpdate(query, {$set: updates}, (err,result)=>{
                    if(err){
                        console.log("<<< Error while trying to update >>>");
                        reject(err);
                    }
                    resolve(result);
                    client.close();
                });
            });
        });
    };  

    //aggregates collections
    const aggregate = (collectionName, pipeline = []) => {
        return new Promise((resolve,reject)=>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err,client)=>{
                if(err){
                    console.log("<<< Error while trying to connect to DB >>>");
                    return reject(err);
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);                
                collection.aggregate(pipeline).toArray((err,result)=>{
                    if(err){
                        console.log("<<< Error while trying to aggregate >>>");
                        reject(err);
                    }                    
                    resolve(result);
                    client.close();
                });
            });
        });
    }

    return {
        count,
        get,
        add,
        aggregate,
        edit        
    };
};