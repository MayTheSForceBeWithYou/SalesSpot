import { MongoClient } from 'mongodb';
const DB_NAME = 'salesspot-db';
let db;

async function connectToDb(cb) {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = client.db(DB_NAME);
    cb();
}

function convertDateTimeStringToISO(dateTimeString) {
    // The datetime is in Eastern timezone
    
}

connectToDb(() => {
    console.log('Successfully connected to database!');
    console.log(db);
    let cursor = db.collection('deals').find();
    console.log(cursor);
    
    let counter = 1;
    // Execute the each command, triggers for each document
    cursor.forEach((item) => {
        console.log(`Item #${counter}`);
        // console.log(JSON.stringify(item, null, 2));
        if(item.properties?.intro_meeting_date__c) {
            let introMeetingDateText = item.properties?.intro_meeting_date__c;
            introMeetingDateText = introMeetingDateText.replace(',', '');
            console.log(`introMeetingDateText: ${introMeetingDateText}`);
            // Find month
            const monthRegex = /^\d{1,2}/;
            const monthMatch = introMeetingDateText.match(monthRegex)[0];
            console.log(`monthMatch: ${monthMatch}`);
            // Month constructor is zero based, so subtract one
            const monthInt = parseInt(monthMatch) - 1;
            
            // Find day
            const dayRegex = /(?<=\/)\d{1,2}(?=\/)/;
            const dayMatch = introMeetingDateText.match(dayRegex)[0];
            console.log(`dayMatch: ${dayMatch}`);
            const dayInt = parseInt(dayMatch);
            
            // Find year
            const yearRegex = /(?<=\/)\d{4}/;
            const yearMatch = introMeetingDateText.match(yearRegex)[0];
            console.log(`yearMatch: ${yearMatch}`);
            const yearInt = parseInt(yearMatch);
            
            // Find period
            const periodRegex = /\w{2}$/;
            const periodMatch = introMeetingDateText.match(periodRegex)[0];
            console.log(`periodMatch: ${periodMatch}`);
            
            // Find hour
            const hourRegex = /(?<=\s{1})\d{1,2}(?=:)/;
            const hourMatch = introMeetingDateText.match(hourRegex)[0];
            console.log(`hourMatch: ${hourMatch}`);
            let hourInt = parseInt(hourMatch);
            
            // Find minute
            const minuteRegex = /(?<=:)\d{2}(?=\ )/;
            const minuteMatch = introMeetingDateText.match(minuteRegex)[0];
            console.log(`minuteMatch: ${minuteMatch}`);
            const minuteInt = parseInt(minuteMatch);
            
            // If period is PM, add 12 to hour
            if(periodMatch === 'PM' && hourInt !== 12) {
                hourInt += 12;
            }
            console.log(`hourInt: ${hourInt}`);
            
            // If period is AM and hour is 12, make hour 0
            if(periodMatch === 'AM' && hourInt === 12) {
                hourInt = 0;
            }
            
            // Since we are in Pacific and this was probably Eastern, subtract 3
            hourInt = hourInt - 3;
            if(hourInt < 0) {
                console.error('Error! Hour less than zero!');
                process.exit(1);
            }
            
            let introMeetingDate = new Date(yearInt, monthInt, dayInt, hourInt, minuteInt); 
            console.log(`introMeetingDate: ${introMeetingDate.toISOString()}`);
            
            // Update record
            db.collection('deals').updateOne(
                { id: item.id },
                { $set: { "properties.intro_meeting_date__c": introMeetingDate.toISOString() }}
            );
        }
        counter++;
    });
});