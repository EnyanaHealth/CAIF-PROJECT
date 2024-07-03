//contain the main function and handle the flow of the application.
//import helper functions
const { askLanguagePreference, askLivestockType, handleFeedAndNutrition, handleAnimalDiseases, handleOutbreakInformation, handleBreedingAndReproduction } = require('../helpers/ussdHelpers');

exports.main = (req, res) => {
    //put request body info into a text file
    const { text } = req.body;
    //convert that text file into an array where each value is split by *
    const steps = text.split('*');

    switch (steps.length) {
        case 1:
            askLanguagePreference(req, res);
            break;
        case 2:
            const langChoice = steps[0];
            const mainOptions = `
                Welcome to Amatuungo AidHealth! I can help answer any questions or problems with your livestock. If needed, I can help connect you to a vet as well.
                What can I help you with today?
                1. Livestock feed & nutrition
                2. Animal diseases
                3. Outbreak information and emergency information
                4. Breeding and reproduction
            `;
            res.send(mainOptions);
            break;
        case 3:
            const option = steps[1];
            switch (option) {
                case '1':
                    handleFeedAndNutrition(req, res);
                    break;
                case '2':
                    handleAnimalDiseases(req, res);
                    break;
                case '3':
                    handleOutbreakInformation(req, res);
                    break;
                case '4':
                    handleBreedingAndReproduction(req, res);
                    break;
                default:
                    res.send('Invalid option. Please try again.');
            }
            break;
        default:
            res.send('Invalid input. Please try again.');
    }
};
