import './RecordsTable.css';

const RecordsTable = (results) => {
    console.log(`typeof(results): ${typeof(results)}`);
    let resultsArray = results;
    if(Array.isArray(results.result)) {
        resultsArray = results.result;
    }
    console.log(`resultsArray: ${JSON.stringify(resultsArray, null, 2)}`);
    
    const tableHeader = <thead>
        <tr>
            {Object.keys(resultsArray[0]).map(key => {
                if(key !== 'properties') {
                    return <th key={key}>{key}</th>;
                } else {
                    const retVal = Object.keys(resultsArray[0][key]).map(propKey => {
                        return <th key={propKey}>{propKey}</th>;
                    });
                    return retVal;
                }
                
            })}
        </tr>
    </thead>;
    
    const tableBody = <tbody>
            {resultsArray.map(result => {
                return <tr key={result.id}>
                {Object.keys(result).map(key => {
                    if(key !== 'properties') {
                        return <td key={key}>{result[key]}</td>;
                    } else {
                        const retVal = Object.keys(result[key]).map(propKey => {
                            return <td key={propKey}>{result[key][propKey]}</td>;
                        });
                        return retVal;
                    }
                })}
                </tr>;
            })}
    </tbody>;

    
    return (
        <>
        <table>{tableHeader}{tableBody}
        </table>
        </>
    );
};

export default RecordsTable;