const express = require('express');
const sql = require('mysql')

db = sql.createConnection({
    host: "localhost",
user: "root",
password: "root",
database: "amatuungo_aid"});

db.connect((err) => {
    if(err) {
        console.log("Database connection failed: " + err.stack);
        return;
    }

    console.log("Connected to database")
})


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Test request handlers
app.get("/api/test", function(req, res){
    res.send("Testing Request");
})

//HTTP requests that the USSD will send
app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    //

    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON Welcome to Amatuungo AidHealth! I can help answer any questions or problems with your livestock. If needed, I can help connect you to a vet as well. 
            What can I help you with today?

            Select:
            1. Livestock Feed & Nutrition
            2. Animal Disease Management
            3. Outbreak Information & Emergency information
            4. Breeding & Reproduction Information`;
    } else if ( text == '1') {
        // Business logic for first level response
        response = `CON Livestock Feed & Nutrition
        1. Cattle
        2. Poultry
        3. Sheep
        4. Goat`;
    } else if ( text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        response = `END Disease Management Section. Test: Your number is: ${phoneNumber}`;
    } else if ( text == '1*1') {
        // This is a second level response where the user selected 1 in the first instance
        const accountNumber = 'ACC100101';
        // This is a terminal request. Note how we start the response with END
        response = `END You selected cattle. Your account number is ${accountNumber}`;
    }

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});

//PORT
const PORT = process.env.PORT || 3001


//APP Listen
app.listen(PORT, () => 
    console.log(`Ussd Serverlisten on http://localhost:${PORT}`)
);