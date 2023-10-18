import axios from 'axios';
import { useEffect, useState } from 'react';
import DescribeTable from '../components/DescribeTable';

const HubspotSchemaPage = () => {
    const [describeResult, setDescribeResult] = useState(null);
    const [objName, setObjName] = useState(null);
    
    const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
        console.log('Handling click...');
        axios.get(`http://localhost:8000/api/hubspot/describe/${objName}`)
        .then((response) => {
            // console.log(JSON.stringify(response, null, 2));
            setDescribeResult(response.data);
        });
    };
    
    useEffect(() => {
        console.log(`objName: ${objName}`);
    });
    
    return (
        <>
        <h1>Hubspot Schema</h1>
        <label>Describe Object</label>
        <select name="object" id="object" onChange={e => setObjName(e.target.value)}>
            <option value="">- Select Object -</option>
            {STANDARD_OBJECTS.map((standardObject, selOptIdx) => (
                <option key={selOptIdx} value={standardObject.name}>{standardObject.label}</option>
            ))}
        </select>
        <button onClick={handleClick}>Describe</button>
        {describeResult && <DescribeTable result={describeResult} />}
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

export default HubspotSchemaPage;