import axios from 'axios';
import { useEffect, useState } from 'react';
import RecordsTable from './RecordsTable';

const HubSpotRecords = () => {
    const [objName, setObjName] = useState(null);
    const [describeResult, setDescribeResult] = useState(null);
    const [queryResponseData, setQueryResponseData] = useState(null);
    
    const getSelectedValues = (select) => {
        const result = [];
        const options = select && select.options;
        let opt;
      
        for (let i=0, iLen = options.length; i < iLen; i++) {
            opt = options[i];
            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }
        return result;
    };
    
    const handleObjectSelection = async (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling object selection...');
        setQueryResponseData(null);
        setObjName(event.target.value);
        console.log(`objName: ${objName}`);
        console.log(`http://localhost:8000/api/hubspot/describe/${event.target.value}`);
        axios.get(`http://localhost:8000/api/hubspot/describe/${event.target.value}`)
        .then((response) => {
            console.log(JSON.stringify(response, null, 2));
            setDescribeResult(response.data);
        });
    };
    
    const handleQuery = async (event: React.MouseEvent<HTMLElement>) => {
        // TODO: Add check for unselected object name
        console.log('Handling query click...');
        const fieldsSelect = document.getElementById("queryFields");
        const selectedFields = getSelectedValues(fieldsSelect);
        console.log(`selectedFields: ${JSON.stringify(selectedFields, null, 2)}`);
        const properties = selectedFields.join(',');
        console.log(`properties: ${JSON.stringify(properties, null, 2)}`);
        console.log(`objName: ${objName}`);
        let calloutString = `http://localhost:8000/api/hubspot/objects/${objName}`;
        if(properties.length > 0) {
            calloutString += `?properties=${properties}`;
        }
        console.log(`calloutString: ${calloutString}`);
        axios.get(calloutString)
        .then((response) => {
            console.log(`response: ${JSON.stringify(response, null, 2)}`);
            setQueryResponseData(response.data);
        });
    };
    
    const handleSaveToDb = async (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling save to db click...');
        axios.put(`http://localhost:8000/api/local/objects/${objName}`, { data: queryResponseData })
        // axios.put(`http://localhost:8000/api/local/objects/${objName}`, { data: queryResultSubset })
        .then((response) => {
            console.log(JSON.stringify(response, null, 2));
            // setQueryResult(response.data);
        })
        .catch((err => {
            console.error('Error saving to db');
            console.error(`err: ${JSON.stringify(err, null, 2)}`);
        }));
    };
    
    useEffect(() => {
        console.log(`objName: ${objName}`);
    });
    
    return (
        <>
        <label>Query Object</label>
        <select name="object" id="object" onChange={handleObjectSelection}>
            <option value="">- Select Object -</option>
            {STANDARD_OBJECTS.map((standardObject, selOptIdx) => (
                <option key={selOptIdx} value={standardObject.name}>{standardObject.label}</option>
            ))}
        </select>
        {describeResult &&
            <>
            <br />
            <label>Query Fields</label>
            <select id="queryFields" multiple="multiple" size="6">
            {describeResult.map(field => (
                <option key={field.name} value={field.name}>{field.label}</option>
            ))}
            </select>
            </>
        }
        <button onClick={handleQuery}>Query</button>
        {queryResponseData && <button onClick={handleSaveToDb}>Save to DB</button>}
        {queryResponseData && <RecordsTable result={queryResponseData} />}
        </>
    );
};

const STANDARD_OBJECTS = [
    {
        label: 'Contacts',
        name: 'contacts'
    },
    {
        label: 'Companies',
        name: 'companies'
    },
    {
        label: 'Deals',
        name: 'deals'
    },
    // { // Not working
    //     label: 'Feedback Submissions',
    //     name: 'feedback_submissions'
    // },
    {
        label: 'Line Items',
        name: 'line_items'
    },
    {
        label: 'Products',
        name: 'products'
    },
    {
        label: 'Quotes',
        name: 'quotes'
    },
    {
        label: 'Taxes',
        name: 'taxes'
    },
    {
        label: 'Tickets',
        name: 'tickets'
    }
];

export default HubSpotRecords;