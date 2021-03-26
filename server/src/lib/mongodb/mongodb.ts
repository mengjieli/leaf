import { MongoClient, MongoClientOptions, Db, Collection } from 'mongodb'

export class MongoDB {

  hasConnect: boolean = false;

  private client: MongoClient;

  connect(url): Promise<void> {
    return new Promise<void>((resolve, rejrect) => {
      MongoClient.connect(url, (err, client) => {
        if (err) rejrect(err);
        else {
          this.hasConnect = true;
          this.client = client;
          resolve();
        }
      });
    });
  }

  getDB(name: string): DB {
    let db = new DB();
    db.db = this.client.db(name);
    return db;
  }

  close() {
    if (!this.hasConnect) return;
    this.client.close();
    this.client = null;
    this.hasConnect = false;
  }
}

export class DB {

  public db: Db;

  getCollection(collection: string): DBCollection {
    if (!this.hasCollection(collection)) return null;
    let c = new DBCollection();
    c.collection = this.db.collection(collection);
    return c;
  }

  hasCollection(collection: string): boolean {
    return this.db.collection(collection) ? true : false;
  }

  createCollection(collection: string) {
    return new Promise<DBCollection>((resolve, reject) => {
      if (this.hasCollection(collection)) {
        resolve(this.getCollection(collection));
      } else {
        this.db.createCollection('site', function (err, res) {
          if (err) reject(err);
          else resolve(this.getCollection(collection));
        });
      }
    });
  }
}

export class DBCollection {
  collection: Collection;

  insertOne(obj: any) {
    return new Promise<any>((resolve, reject) => {
      this.collection.insertOne(obj, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  insert(objs: any[]) {
    return new Promise<any>((resolve, reject) => {
      this.collection.insert(objs, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  find(obj: any, filter?: any) {
    return new Promise<any>((resolve, reject) => {
      this.collection.find(obj).toArray((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  findOne(obj: any) {
    return new Promise<any>((resolve, reject) => {
      this.collection.findOne(obj, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  updateOne(find: any, obj: any) {
    return new Promise<any>((resolve, reject) => {
      this.collection.updateOne(find, obj, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  updateMany(find: any, obj: any) {
    return new Promise<any>((resolve, reject) => {
      this.collection.updateMany(find, obj, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  deleteOne(find: any) {
    return new Promise<any>((resolve, reject) => {
      this.collection.deleteOne(find, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  deleteMany(find: any) {
    return new Promise<any>((resolve, reject) => {
      this.collection.deleteMany(find, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  sort(by: any) {
    return new Promise<any>((resolve, reject) => {
      this.collection.find().sort(by).toArray((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }


}