import { MongoClient } from 'mongodb';
import { hubspotClient, batchUpdateRecords } from './hubspot.js';

const DB_NAME = 'salesspot-db';
let db;

async function connectToDb(cb) {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = client.db(DB_NAME);
    cb();
}

connectToDb(async () => {
    let cursor = db.collection('deals').find();
    let updatedDeals = [];
    await cursor.forEach((item) => {
        if(item.properties?.intro_meeting_date__c) {
            // console.log(item.properties?.intro_meeting_date__c);
            updatedDeals.push({"id": item.id, "properties": { "intro_meeting_date__c": item.properties?.intro_meeting_date__c}});
            console.log(updatedDeals.length);
        }
    });
    console.log(updatedDeals.length);
    console.log(updatedDeals);
    // Example of format we want to end up with
    // let dealsToBatchUpdate = {
    //     "inputs": [
    //         {
    //             "id": "14942779415",
    //             "properties": {
    //                 "intro_meeting_date__c": "10/1/2020, 3:00 PM"
    //             }
    //         }
    //     ]
    // };
    
    const chunkSize = 100;
    for (let idxChunk = 0; idxChunk < updatedDeals.length; idxChunk += chunkSize) {
        const chunk = updatedDeals.slice(idxChunk, idxChunk + chunkSize);
        let dealsToBatchUpdate = {
            "inputs": chunk
        };
        
        batchUpdateRecords('deals', dealsToBatchUpdate)
        .then(response => {
            console.log(`response: ${JSON.stringify(response, null, 2)}`);
        })
        .catch(error => {
            console.error(`error: ${JSON.stringify(error, null, 2)}`);
        });
    }
    
        
});