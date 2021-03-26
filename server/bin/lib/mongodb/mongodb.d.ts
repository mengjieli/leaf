import { Db, Collection } from 'mongodb';
export declare class MongoDB {
    hasConnect: boolean;
    private client;
    connect(url: any): Promise<void>;
    getDB(name: string): DB;
    close(): void;
}
export declare class DB {
    db: Db;
    getCollection(collection: string): DBCollection;
    hasCollection(collection: string): boolean;
    createCollection(collection: string): Promise<DBCollection>;
}
export declare class DBCollection {
    collection: Collection;
    insertOne(obj: any): Promise<any>;
    insert(objs: any[]): Promise<any>;
    find(obj: any, filter?: any): Promise<any>;
    findOne(obj: any): Promise<any>;
    updateOne(find: any, obj: any): Promise<any>;
    updateMany(find: any, obj: any): Promise<any>;
    deleteOne(find: any): Promise<any>;
    deleteMany(find: any): Promise<any>;
    sort(by: any): Promise<any>;
}
