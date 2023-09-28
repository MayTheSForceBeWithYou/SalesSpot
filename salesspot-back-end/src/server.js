import express from 'express';
import cors from 'cors';
import { db, connectToDb } from './db.js';
import axios from 'axios';
import { hubspotClient, getObjectProperties, getAllObjectRecordsWithProperties } from './hubspot.js';

const apiKey = process.env.HUBSPOT_ACCESS_TOKEN;
// Define the request headers
const AUTH_HEADERS = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
};

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors());

// TODO: Add try/catches to all methods

app.get('/api/hubspot/describe/:objName', (req, res) => {
    console.log('Inside GET /api/hubspot/describe/:objName');
    res.set('Access-Control-Allow-Origin', '*');
    const { objName } = req.params;
    console.log(`Server objName: ${objName}`);
    getObjectProperties(objName)
    .then(result => {
        res.json(result.results);
    })
    .catch(err => {
        console.error('Error');
        res.send(JSON.stringify(err));
    });
});

app.get('/api/hubspot/objects/:objName', async (req, res) => {
    console.log('Inside GET /api/hubspot/objects/:objName');
    res.set('Access-Control-Allow-Origin', '*');
    console.log(`req.params: ${JSON.stringify(req.params, null, 2)}`);
    const { objName } = req.params;
    console.log(`objName: ${objName}`);
    const properties = req.query.properties.split(',');
    console.log(`properties: ${properties}`);
    
    // getAllObjectRecordsWithProperties(objName, properties)
    // .then(result => {
    //     console.log(JSON.stringify(result));
    //     res.json(result);
    // })
    // .catch(err => {
    //     console.error('Error');
    //     console.error(JSON.stringify(err));
    //     res.send(JSON.stringify(err));
    // });
    
    try {
        const allRecords = await getAllObjectRecordsWithProperties(objName, properties);
        console.log(`allRecords: ${JSON.stringify(allRecords)}`);
        res.json(allRecords);
    } catch(err) {
        console.error('Error');
        console.error(JSON.stringify(err));
        res.send(JSON.stringify(err));
    }
    
    // .then(result => {
    //     console.log(JSON.stringify(result));
    //     res.json(result);
    // })
    // .catch(err => {
    //     console.error('Error');
    //     console.error(JSON.stringify(err));
    //     res.send(JSON.stringify(err));
    // });

    
});

app.get('/api/test', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    console.log('Inside GET /api/test');
    res.send('Server connection working!');
});

app.put('/api/local/objects/:objName', async (req, res) => {
    console.log('Inside PUT /api/local/objects/:objName');
    res.set('Access-Control-Allow-Origin', '*');
    console.log(`req.body.data: ${JSON.stringify(req.body.data)}`);
    const { objName } = req.params;
    console.log(`Server objName: ${objName}`);
    const records = JSON.parse(JSON.stringify(req.body.data));
    console.log(`records: ${JSON.stringify(records, null, 2)}`);
    const hubspotIds = records.map(rec => rec.id);
    console.log(`hubspotIds: ${JSON.stringify(hubspotIds, null, 2)}`);
    // /*
    try {
        // TODO: Make this an upsert? Match on id? Clear out collection before insert?
        await db.collection(objName).insertMany(records);
        res.send(`Successfully inserted ${records.length} into ${objName} collection!`);
    } catch(ex) {
        console.error(`Error inserting ${records.length} into ${objName} collection...`);
        console.error(JSON.stringify(ex, null, 2));
        res.status(500).send(`Error inserting ${records.length} into ${objName} collection...\n${JSON.stringify(ex, null, 2)}`);
    }
    // */
});

const PORT = process.env.PORT || 8000;

connectToDb(() => {
    console.log('Successfully connected to database!');
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});