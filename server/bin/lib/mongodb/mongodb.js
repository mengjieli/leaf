"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var MongoDB = /** @class */ (function () {
    function MongoDB() {
        this.hasConnect = false;
    }
    MongoDB.prototype.connect = function (url) {
        var _this = this;
        return new Promise(function (resolve, rejrect) {
            mongodb_1.MongoClient.connect(url, function (err, client) {
                if (err)
                    rejrect(err);
                else {
                    _this.hasConnect = true;
                    _this.client = client;
                    resolve();
                }
            });
        });
    };
    MongoDB.prototype.getDB = function (name) {
        var db = new DB();
        db.db = this.client.db(name);
        return db;
    };
    MongoDB.prototype.close = function () {
        if (!this.hasConnect)
            return;
        this.client.close();
        this.client = null;
        this.hasConnect = false;
    };
    return MongoDB;
}());
exports.MongoDB = MongoDB;
var DB = /** @class */ (function () {
    function DB() {
    }
    DB.prototype.getCollection = function (collection) {
        if (!this.hasCollection(collection))
            return null;
        var c = new DBCollection();
        c.collection = this.db.collection(collection);
        return c;
    };
    DB.prototype.hasCollection = function (collection) {
        return this.db.collection(collection) ? true : false;
    };
    DB.prototype.createCollection = function (collection) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.hasCollection(collection)) {
                resolve(_this.getCollection(collection));
            }
            else {
                _this.db.createCollection('site', function (err, res) {
                    if (err)
                        reject(err);
                    else
                        resolve(this.getCollection(collection));
                });
            }
        });
    };
    return DB;
}());
exports.DB = DB;
var DBCollection = /** @class */ (function () {
    function DBCollection() {
    }
    DBCollection.prototype.insertOne = function (obj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.collection.insertOne(obj, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    };
    DBCollection.prototype.insert = function (objs) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.collection.insert(objs, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    };
    DBCollection.prototype.find = function (obj, filter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.collection.find(obj).toArray(function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    };
    DBCollection.prototype.findOne = function (obj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.collection.findOne(obj, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    };
    DBCollection.prototype.updateOne = function (find, obj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.collection.updateOne(find, obj, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    };
    DBCollection.prototype.updateMany = function (find, obj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.collection.updateMany(find, obj, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    };
    DBCollection.prototype.deleteOne = function (find) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.collection.deleteOne(find, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    };
    DBCollection.prototype.deleteMany = function (find) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.collection.deleteMany(find, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    };
    DBCollection.prototype.sort = function (by) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.collection.find().sort(by).toArray(function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    };
    return DBCollection;
}());
exports.DBCollection = DBCollection;
//# sourceMappingURL=mongodb.js.map