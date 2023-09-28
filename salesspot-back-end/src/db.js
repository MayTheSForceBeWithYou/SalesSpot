import { MongoClient } from 'mongodb';

const DB_NAME = 'salesspot-db';

let db;

async function connectToDb(cb) {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = client.db(DB_NAME);
    cb();
}

export {
    db,
    connectToDb
};