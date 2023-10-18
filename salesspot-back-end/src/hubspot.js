import { Client } from '@hubspot/api-client';

const ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
console.log(`ACCESS_TOKEN: ${ACCESS_TOKEN}`);
const MAX_PAGE_LIMIT = 100;
export const hubspotClient = new Client({ accessToken: ACCESS_TOKEN });
// console.log(`hubspotClient: ${JSON.stringify(hubspotClient, null, 2)}`);

export const getAllObjectRecordsWithProperties = async (objName, properties) => {
    // let after = "14943583669";
    // const config = {
    //     limit: MAX_PAGE_LIMIT,
    //     after: after,
    //     properties: properties,
    //     propertiesWithHistory: undefined,
    //     associations: undefined,
    //     archived: undefined,
    //     _options: undefined
    // };
    // return hubspotClient.crm[objName].basicApi.getPage(
    //     config.limit,
    //     config.after,
    //     config.properties,
    //     config.propertiesWithHistory,
    //     config.associations,
    //     config.archived,
    //     config._options
    // );
    const allResults = allObjectRecordsResult(objName, properties);
    return allResults;
};

export const getObjectProperties = (obj) => {
    return hubspotClient.crm.properties.coreApi.getAll(obj);
};

const allObjectRecordsResult = async (objName, properties) => {
    let results = [];
    let after = undefined;
    const config = {
        limit: MAX_PAGE_LIMIT,
        after: after,
        properties: properties,
        propertiesWithHistory: undefined,
        associations: undefined,
        archived: undefined,
        _options: undefined
    };
    let awaitedResponse;
    do {
        awaitedResponse = await hubspotClient.crm[objName].basicApi.getPage(
            config.limit,
            config.after,
            config.properties,
            config.propertiesWithHistory,
            config.associations,
            config.archived,
            config._options
        );
        console.log(`awaitedResponse: ${JSON.stringify(awaitedResponse, null, 2)}`);
        if(awaitedResponse?.results) {
            results.push(...awaitedResponse.results);
        }
        if(awaitedResponse?.paging?.next?.after) {
            config.after = awaitedResponse.paging.next.after;
        }
    } while(awaitedResponse?.paging?.next?.after);
    return results;
};

export const batchUpdateRecords = async (objName, records) => {
    return await hubspotClient.crm.objects.batchApi.update(objName, records);
};

const batchUpdateDeals = async (records) => {
    return await hubspotClient.crm.deals.batchApi.update(records);
};

const batchReadDeals = async (dealIds) => {
    return await hubspotClient.crm.deals.batchApi.read(dealIds)
};

/*
let dealsToBatchUpdate = {
    "inputs": [
        {
            "id": "14942779415",
            "properties": {
                "intro_meeting_date__c": "10/1/2020, 3:00 PM"
            }
        }
    ]
};
*/

/*
let dealsToBatchRead = {
    "inputs": [{
        "id": "14942779415"
    }]
};
*/

/*
batchUpdateRecords('deals', dealsToBatchUpdate)
.then(response => {
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
})
.catch(error => {
    console.error(`error: ${JSON.stringify(error, null, 2)}`);
});
*/

/*
batchReadDeals(dealsToBatchRead)
.then(response => {
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
})
.catch(error => {
    console.error(`error: ${JSON.stringify(error, null, 2)}`);
});
*/

/*
batchUpdateDeals(dealsToBatchUpdate)
.then(response => {
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
})
.catch(error => {
    console.error(`error: ${JSON.stringify(error, null, 2)}`);
});
*/
