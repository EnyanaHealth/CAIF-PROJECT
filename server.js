//setting up dependencies & server
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Import routes
const ussdRoutes = require('./routes/index');

app.use('/ussd', ussdRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//past code not needed
/*
// Handle GET request for the root path
app.get('/', (req, res) => {
    const welcomeMessage = `
        Welcome to the Amatuungo Aid. We can provide you with knowledge related to livestock health or connect you with a vet.
        What is your question or problem related to:
        Select an option:
        1. Diseases
        2. Animal Nutritioning tips.
        3. Consult an agriculture expert.
    `;

    res.send(welcomeMessage);
});


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

// Handle incoming USSD requests
app.post('/ussd', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    if (text === '') {
        // Initial USSD prompt
        let response = `
            Welcome to the Amatuungo Aid. We can provide you with knowledge related to livestock health 
            or connect you with a vet. What is your question or problem related to:
            Select an option:
            1. Diseases
            2. Animal Nutritioning tips.
            3. Consult a veterinary expert.
        `;
        res.send(response);
    } else {
        // Process user's response
        switch (text) {
            case '1':
                // Respond to option 1: Diseases
                let issueResponse = `
                    Your animals are sick, boo hoo HAHA!
                `;
                res.send(issueResponse);
                break;
            case '2':
                // Respond to option 2: Get Animal Nutrition Information
                let tipsResponse = `
                    Why dont you know how to feed your animals bruh?!
                    This is why your breath smells bad!
                `;
                res.send(tipsResponse);
                break;
            case '3':
                // Respond to option 3: Consult an expert
                let expertResponse = `
                    An expert will be with you shortly.
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
*/
