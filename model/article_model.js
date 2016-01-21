var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongo = require('mongodb');

var mongoURL = 'mongodb://localhost:50712/blog';

var articleModel = {
    findList: function(callback, select) {
        connectDB(function(db){
            if(select){
                var list = db.collection('blogList').find(select);
            } else {
                var list = db.collection('blogList').find();
            }
            callback(list);
        });
    },
    findOne: function(id, callback) {
        connectDB(function(db){
            var list = db.collection('blogList').find({id: id});
            callback(list);
        });
    },
    insert: function(article) {
        connectDB(function(db){
            db.collection('blogList').insertOne(article);
        });
    },
    update: function(id, content) {
        connectDB(function(db){
            db.collection('blogList').updateOne(
                {id: id},
                {$set: content}
            );
        });
    },
    remove: function(id) {
        connectDB(function(db){
            db.collection('blogList').deleteOne({id: id});
        });
    },
    removeAll: function() {
        connectDB(function(db){
            db.collection('blogList').deleteMany();
        });
    }
}
module.exports = articleModel;

function connectDB(callback) {
    MongoClient.connect(mongoURL, function(err, db){
        if (err) throw err;
        callback(db);
    });
}