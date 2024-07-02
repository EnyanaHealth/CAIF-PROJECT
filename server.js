const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Handle GET request for the root path
app.get('/', (req, res) => {
    res.send('Welcome to your agriculture extension service.');
});
/*
// Handle incoming USSD requests
app.post('/ussd', (req, res) => {
    // Process USSD request logic here
    console.log('Received USSD request:', req.body);

    // Example: Send a response back to the user
    const response = `
        Welcome to the Agriculture Extension Service.
        1. Report an issue with your livestock.
        2. Get farming tips.
        3. Consult an agriculture expert.
    `;
    res.send(response);
});
*/
// Handle incoming USSD requests
app.post('/ussd', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    if (text === '') {
        // Initial USSD prompt
        let response = `
            Welcome to the Agriculture Extension Service.
            Select an option:
            1. Report an issue with your livestock.
            2. Get farming tips.
            3. Consult an agriculture expert.
        `;
        res.send(response);
    } else {
        // Process user's response
        switch (text) {
            case '1':
                // Respond to option 1: Report an issue
                let issueResponse = `
                    Please describe the issue with your livestock.
                    E.g., "My cows have ticks."
                `;
                res.send(issueResponse);
                break;
            case '2':
                // Respond to option 2: Get farming tips
                let tipsResponse = `
                    Here are some farming tips:
                    - Tip 1: Use organic fertilizer for better yield.
                    - Tip 2: Rotate your crops to maintain soil fertility.
                `;
                res.send(tipsResponse);
                break;
            case '3':
                // Respond to option 3: Consult an expert
                let expertResponse = `
                    An agriculture expert will be with you shortly.
                    Please hold on.
                `;
                res.send(expertResponse);
                break;
            default:
                // Handle invalid input
                let defaultResponse = `
                    Invalid option. Please select a valid option:
                    1. Report an issue with your livestock.
                    2. Get farming tips.
                    3. Consult an agriculture expert.
                `;
                res.send(defaultResponse);
                break;
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
