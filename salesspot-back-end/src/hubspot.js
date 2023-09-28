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