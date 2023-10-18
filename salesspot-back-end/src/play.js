import axios from 'axios';

// Set up your authentication credentials
const apiKey = process.env.HUBSPOT_ACCESS_TOKEN;
const baseUrl = 'https://api.hubapi.com/crm/v3/objects/deals?limit=100&properties=intro_meeting_date__c';

// Define the request headers
const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
};

// Make the API request to retrieve custom fields
axios.get(baseUrl, { headers })
.then((response) => {
    // Check if the request was successful (status code 200)
    if (response.status === 200) {
        console.log(JSON.stringify(response.data, null, 2));
        // console.log(response.data.results.length);
    } else {
      console.error(`Error: ${response.status}`);
    }
})
.catch((error) => {
    console.error('An error occurred:', error);
});
