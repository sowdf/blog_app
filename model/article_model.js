var articleModel = {
    findList: function(db, callback, select) {
        if (select) {
            var list = db.collection('blogList').find(select);
        } else {
            var list = db.collection('blogList').find();
        }
        callback(list);
    },
    findOne: function(db, id, callback) {
        var list = db.collection('blogList').find({
            id: id
        });
        callback(list);
    },
    insert: function(db, article) {
        db.collection('blogList').insertOne(article);
    },
    update: function(db, id, content) {
        db.collection('blogList').updateOne({
            id: id
        }, {
            $set: content
        });
    },
    remove: function(db, id) {
        db.collection('blogList').deleteOne({
            id: id
        });
    },
    removeAll: function(db) {
        db.collection('blogList').deleteMany();
    }
}
module.exports = articleModel;