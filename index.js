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
    //res.send("Testing Request");
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

    //initialize a string variabe that can be edited
    let userinput = text;
    console.log("Text:", userinput); 
    //initialize a variable to store animal info
    let userAnimal;
    //intialize a variable to store animal disease intent
    let userAnimalDiseaseIntent;
    //initialize variable to store animal disease
    let animalDisease;


    //initialize response body (this will be sent back to API)
    let response = '';
    let counter = returnstringlength(userinput);
    //very counter
    console.log("Counter:", counter);
    

    

    const mainmenu = () => {
        response = `CON Welcome to Amatuungo Aid. What can we help you with?

            Select:
            1. Livestock Feed & Nutrition
            2. Animal Disease Management
            3. Outbreak Information & Emergency information
            4. Breeding & Reproduction Information`;
        
        checkIfZero (counter, res, response);
        //route to next functions
        if (userinput[0] == '1') livestockProblem();//send to livestock
        else if (userinput[0] == '2') animalDiseaseManagementProblem ();//send to animal disease mgmt
        else if (userinput[0] == '3') outbreakInfo (); //send to outbreak
        else if (userinput[0] == '4') breedingInfo ();//breeding info

    };

    mainmenu ();

    function livestockProblem () {
        response = `CON You selected 1. Livestock Feed & Nutrition`;
        //verify counter is being reduced
        /*
        console.log("Counter:", counter);
        console.log("Entered livestock");
        console.log("user: ", userinput);
        shortenuserinput();
        console.log("user: ", userinput);
        checkIfZero (counter, res, response);*/
        askAnimal();
        giveNutritionInfo();
        

    };

    function animalDiseaseManagementProblem () {
        response = `CON You selected 2. Animal Disease Management`;
        /*console.log("Entered ADM");
        console.log("user: ", userinput);
        shortenuserinput();
        console.log("user: ", userinput);
        checkIfZero (counter, res, response);*/
        
        askAnimal();
        response = `CON You selected ${userAnimal}`;
        askAnimalDiseaseIntent();
        response = `CON You selected ${userAnimalDiseaseIntent}`;
       
        if (userAnimalDiseaseIntent === 'Disease Identification') {
            
            identifyDisease();
            shortenuserinput();
            response = `CON It seems your ${userAnimal} has ${animalDisease}.`;
            //checkIfZero (counter, res, response);
            
           
            if (animalDisease == 'East Coast Fever') {
                promptDeviceConnection();
            }
            else if (animalDisease  == 'Foot & Mouth Disease') {
                giveTreatmentInfo();
            }
            
            else if (animalDisease  == 'Brucella Virus') {
                connectVet();


            }
             
        }
        else if (userAnimalDiseaseIntent === 'Disease Treatment'){

        }
        else if (userAnimalDiseaseIntent === 'Disease Prevention'){

        }

        
    };

    function connectVet() {
        response = `END ` + response + `${animalDisease} needs further assistance from a vet. We have sent your case file to your vet. They will respond in 1-2 days `;
        shortenuserinput();
        checkIfZero (counter, res, response);

    };

    function promptDeviceConnection() {
        response = `END ` + response + `${animalDisease} diagnosis can be confirmed using our device...`;
        shortenuserinput();
        checkIfZero (counter, res, response);
    };

    function giveTreatmentInfo () {
        response = `END ` + response + `${animalDisease} can be treated using... (insert treatment information)`;
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };

    function outbreakInfo () {
        response = `END You selected 3. Outbreak Information
            Here is the latest outbreak information in your region...`;
        console.log("Entered outbreak");
        console.log("user: ", userinput);
        shortenuserinput();
        console.log("user: ", userinput);
        checkIfZero (counter, res, response);
    };

    function breedingInfo () {
        response = `You selected 4. Breeding Information`;
        /*console.log("Entered breeding");
        console.log("user: ", userinput);
        shortenuserinput();
        console.log("user: ", userinput);
        checkIfZero (counter, res, response);*/
        askAnimal();
        giveBreedingInfo();
    };

    function askAnimal () {
        response = response + `\n What animal is your question related to?
        Select:
            1. Cattle
            2. Sheep
            3. Goat
            4. Chicken`;
        //check if this is the farthest they've got
        checkIfZero (counter, res, response);
        //remove choice from input
        shortenuserinput();
        //route to next functions
        if (userinput[0] == '1') {
            userAnimal = 'Cattle';
        }
        else if (userinput[0] == '2') {
            userAnimal = 'Sheep';
        }
        else if (userinput[0] == '3') {
            userAnimal = 'Goat';
        }
        else if (userinput[0] == '4') {
            userAnimal = 'Chicken';
        }
    };

    function askAnimalDiseaseIntent () {
        console.log ("entered askanimaldiseasteintent");
        response = response + `CON \n What is your question/problem most related to?
        Select:
             1. Disease Identification: I don't know or am not sure what disease my animal has.
             2. Disease Treatment: I know what disease my animal has, but I don't know how to treat it.
             3. Disease Prevention: I want to learn to prevent diseases in my animal.`;
        
        //check if this is the farthest they've got
        checkIfZero (counter, res, response);
        //remove choice from input
        shortenuserinput();
        //route to next functions
        if (userinput[0] == '1') {
            userAnimalDiseaseIntent = `Disease Identification`;
        }
        else if (userinput[0] == '2') {
            userAnimalDiseaseIntent  = `Disease Treatment`;
        }
        else if (userinput[0] == '3') {
            userAnimalDiseaseIntent = `Disease Prevention`;
        }

    };

    function identifyDisease() {
        response = response + `CON \n Let's identify the disease in your ${userAnimal}.
        What symptoms does your ${userAnimal} have?
        Select one:
             1. High Fever
             2. Loss of Appetite
             3. Stinky poops`;
        
        //check if this is the farthest they've got
        checkIfZero (counter, res, response);
        //remove choice from input
        shortenuserinput();
        if (userinput[0] == '1') {
            animalDisease = 'East Coast Fever';
        }
        else if (userinput[0] == '2') {
            animalDisease  = 'Foot & Mouth Disease';
        }
        else if (userinput[0] == '3') {
            animalDisease  = 'Brucella Virus';
        }
    };

    function giveNutritionInfo () {
        response = `END You selected ${userAnimal}. Here is how to feed your ${userAnimal}...`;
        shortenuserinput();
        checkIfZero (counter, res, response);

    };

    function giveBreedingInfo () {
        response = `END You selected ${userAnimal}. Here is how to breed your ${userAnimal}...`;
        shortenuserinput();
        checkIfZero (counter, res, response);

    };




    function checkIfZero (value, res, response)  {
        //if all inputs have been read, send response
        if (value ===0) {            
            console.log("entered checkIfZero and is zero");
            res.send(response);

        }
        //else, continue in the rest of the flow
        else if (value ===1){
            console.log("entered checkIfZero and counter is 1");
            counter = counter -1;
            
        }
        else {
            console.log("Counter before:", counter);
            counter = counter -2;
            console.log("Counter after:", counter);

        }

        
        
    };

    //return legnth of string function:
    function returnstringlength (string) {
        return string.length;
    };

    //function to shorten the string
    function shortenuserinput () {
        //shorten if length = 3
        if (userinput.length >2) {
        userinput = userinput.slice(2);
        }
        else {
            userinput = '';
        }
    };

    
});




//PORT
const PORT = process.env.PORT || 3001


//APP Listen
app.listen(PORT, () => 
    console.log(`Ussd Serverlisten on http://localhost:${PORT}`)
);