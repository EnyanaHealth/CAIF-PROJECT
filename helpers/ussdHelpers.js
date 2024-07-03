//contains all the reusable functions.

exports.askLanguagePreference = (req, res) => {
    const response = `
        Please select your language:
        1. English
        2. Runyankole
    `;
    res.send(response);
};


//main functions
exports.handleFeedAndNutrition = (req, res) => {
    this.askLivestockType(req, res);
};

exports.handleAnimalDiseases = (req, res) => {
    this.askLivestockType(req, res);
    this.routeDiseaseManagementIntent(req,res);
};


exports.handleOutbreakInformation = (req, res) => {
    const response = `
        Please describe the outbreak or emergency situation.
    `;
    res.send(response);
};

exports.handleBreedingAndReproduction = (req, res) => {
    this.askLivestockType(req, res);
};


//common functions

exports.askLivestockType = (req, res) => {
    const response = `
        Please select your livestock type:
        1. Cows
        2. Goats
        3. Chickens
        4. Other
    `;
    res.send(response);
};

exports.routeDiseaseManagementIntent = (req, res) => {
    const response = `
        Animal Disease Management:
        Please select an option that matches your question or problem:
        1. Disease Identification: I don't know or am not sure what disease my animal has.
        2. Disease Treatment: I know what disease my animal has, but I don't know how to treat it. 
        3. Disease Management: I want to learn to prevent diseases in my animal. 
        4. Other
    `;
    res.send(response);
};
