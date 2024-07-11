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

function userPromise(phoneNumber, category){
    return new Promise((resolve, reject) => {

        var createUserStatement = `INSERT INTO user VALUES(0, "${phoneNumber}", "${category}")`;

        db.query(createUserStatement, (err, result) => {

            if(err) {
                reject(err)
            }

            resolve(result)
        })
    });
}

function farmerPromise(farmerId, farmerName){
    return new Promise((resolve, reject) => {

        var createFarmerStatement = `INSERT INTO farmer VALUES("${farmerId}", "${farmerName}")`;

        db.query(createFarmerStatement, (err, result) => {

            if(err) {
                reject(err)
            }

            resolve(result)
        })
    });
}

function VeterinaryDoctorPromise(VetId, VetName){
    return new Promise((resolve, reject) => {

        var createVeterinaryDoctorStatement = `INSERT INTO veterinarydoctor VALUES("${VetId}", "${VetName}")`;

        db.query(createVeterinaryDoctorStatement, (err, result) => {

            if(err) {
                reject(err)
            }

            resolve(result)
        })
    });
}
function SystemsAdminPromise(adminId, adminName, email, password){
    return new Promise((resolve, reject) => {

        var createSystemAdminStatement = `INSERT INTO systemadmin VALUES("${adminId}", "${adminName}", "${email}", "${password}")`;

        db.query(createSystemAdminStatement, (err, result) => {

            if(err) {
                reject(err)
            }

            resolve(result)
        })
    });
}

//API Endpoint to register users in the system
app.post('/register_user', (req, res) => {
    const {userName, userCategory, userPhoneNumber, userEmail, userPassword} = req.body;



    switch (userCategory) {

        case "Farmer":
            userPromise(userPhoneNumber, userCategory).then((result) => {
                farmerPromise(userPhoneNumber, userName).then((result) => {
                    console.log(result)
                    res.send(JSON.stringify({"Message": "Farmer Record created"}))
                }).catch((err) => {
                    console.log(err)
                    res.send(JSON.stringify({'Message': "Error creating farmer"}))
                })
            }
        ).catch((err) => {

            console.log(err);
            res.send(JSON.stringify({'Message': "You are already registered as a user"}))})
        break;

        case "veterinarydoctor":
            userPromise(userPhoneNumber, userCategory).then((result) => {
                VeterinaryDoctorPromise(userPhoneNumber, userName).then((result) => {
                    console.log(result)
                    res.send(JSON.stringify({"Message": "VeterinaryDoctor Record created"}))
                }).catch((err) => {
                    console.log(err)
                    res.send(JSON.stringify({'Message': "Error creating VeterinaryDoctor"}))
                })
            }
        ).catch((err) => {

            console.log(err);
            res.send(JSON.stringify({'Message': "You are already registered as a user"}))})
        break;

        case "SystemsAdmin":
            userPromise(userPhoneNumber, userCategory).then((result) => {
                SystemsAdminPromise(userPhoneNumber, userName, userEmail, userPassword).then((result) => {
                    console.log(result)
                    res.send(JSON.stringify({"Message": "SystemsAdmin Record created"}))
                }).catch((err) => {
                    console.log(err)
                    res.send(JSON.stringify({'Message': "Error creating SystemsAdmin"}))
                })
            }
        ).catch((err) => {

            console.log(err);
            res.send(JSON.stringify({'Message': "You are already registered as a user"}))})
        break;
            

        default:
            res.send(JSON.stringify({"Message": "Error, Category Missing"}))
            break;
    }

    
});


function addInformation(queryInformation){

    return new Promise((resolve, reject) => {
        db.query(queryInformation, (err, result) => {
            if(err) {
                reject(err);
            }

            resolve(result)
        })
    })
}

function retrieveInformation(queryInformation){

    return new Promise((resolve, reject) => {
        db.query(queryInformation, (err, result) => {
            if(err) {
                reject(err);
            }

            resolve(result)
        })
    })
}

app.post('/addDiseaseInformation', (req, res) => {

    const {Id, DiseaseName, DiseasePrevention, DiseaseSigns_Symptoms, DiseaseTreatment} = req.body;

    const query = `INSERT INTO animal_diseases VALUES("${Id}", "${DiseaseName}", "${DiseasePrevention}", "${DiseaseSigns_Symptoms}", "${DiseaseTreatment}")`;

    addInformation(query).then((result) => {
        console.log(result);
        res.send(JSON.stringify({"Message": "Information added"}))
    }).catch((err) => {
        console.log(err);
        res.send(JSON.stringify({"Message": "There was an error adding information"}))
    })



})

app.get('/retrievingDiseaseInformation', (req, res) => {

    const query = `SELECT * FROM animal_diseases`;

    retrieveInformation(query).then((result) => {
        console.log(result);
        res.send(JSON.stringify(result))
    }).catch((err) => {
        console.log(err);
        res.send(JSON.stringify({"Message": "There was an error retrieving AnimalDiseaseinformation"}))
    })



})

function addInformation(queryInformation){

    return new Promise((resolve, reject) => {
        db.query(queryInformation, (err, result) => {
            if(err) {
                reject(err);
            }

            resolve(result)
        })
    })
}

function retrieveInformation(queryInformation){

    return new Promise((resolve, reject) => {
        db.query(queryInformation, (err, result) => {
            if(err) {
                reject(err);
            }

            resolve(result)
        })
    })
}

app.post('/addBreeding&Reproduction', (req, res) => {

    const {breedId, breedinfo} = req.body;

    const query = `INSERT INTO breeding$reproduction VALUES("${breedId}", "${breedinfo}")`;

    addInformation(query).then((result) => {
        console.log(result);
        res.send(JSON.stringify({"Message": "Information added"}))
    }).catch((err) => {
        console.log(err);
        res.send(JSON.stringify({"Message": "There was an error adding information"}))
    })



})

app.get('/retrievingBreeding&Reproduction', (req, res) => {

    const query = `SELECT * FROM breeding$reproduction`;

    retrieveInformation(query).then((result) => {
        console.log(result);
        res.send(JSON.stringify(result))
    }).catch((err) => {
        console.log(err);
        res.send(JSON.stringify({"Message": "There was an error retrieving Breeding&Reproductioninformation"}))
    })



})

app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `Welcome to Amatuungo AidHealth! I can help answer any questions or problems with your livestock. If needed, I can help connect you to a vet as well. 
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