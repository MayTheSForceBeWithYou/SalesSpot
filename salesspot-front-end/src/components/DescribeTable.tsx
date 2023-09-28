const DescribeTable = (result: HubSpotFieldDescribe) => {
    console.log(JSON.stringify(result, null, 2));
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Field Label</th>
                    <th>Field API Name</th>
                </tr>
            </thead>
            <tbody>
                {result.result.map((resultRow: HubSpotFieldDescribe, descRowIdx: number) => (
                    <tr key={descRowIdx}>
                        <td>{resultRow.label}</td>
                        <td>{resultRow.name}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </>
    );
};

class HubSpotFieldDescribe {
    updatedAt?: Date;
    createdAt?: Date;
    name?: string;
    label?: string;
    type?: string;
    fieldType?: string;
    description?: string;
    groupName?: string;
    options?: string[];
    updatedUserId?: string;
    displayOrder?: number;
    calculated?: boolean;
    externalOptions?: boolean;
    archived?: boolean;
    hasUniqueValue?: boolean;
    hidden?: boolean;
    showCurrencySymbol?: boolean;
    modificationMetadata?: HubSpotFieldDescribeModificationMetadata;
    formField?: boolean;
}

class HubSpotFieldDescribeModificationMetadata {
    archivable?: boolean;
    readOnlyDefinition?: boolean;
    readOnlyValue?: boolean;
}

export default DescribeTable;