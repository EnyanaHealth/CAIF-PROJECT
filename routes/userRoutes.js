const express = require('express');
const router = express.Router();
const db = require('../config/db');

//API Endpoint to register users in the system
router.post('/register_user', (req, res) => {
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


//need all Promise functions

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
/*
// POST request to update user information
router.post('/updateUser', (req, res) => {
    const { userId, userInfo } = req.body;
    const query = `UPDATE users SET info="${userInfo}" WHERE id="${userId}"`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({"Message": "There was an error updating user information"});
        } else {
            console.log(result);
            res.send({"Message": "User information updated successfully"});
        }
    });
});
*/
module.exports = router;
