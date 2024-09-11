
/**export default class DataAnalysisService {
    
}**/

// made it this way, maybe we will put here more Calculators for Questionaire

// SUSEvaluator.js

class SUSCalcuator {
    static calculateSUSScore(susResult) {
        if (!susResult || !Array.isArray(susResult.susScores) || susResult.susScores.length !== 10) {
            console.error("Problem by SUS-Structure");
        }
        else{

        let score = 0;

        // SUS-Score
        for (let i = 0; i < 10; i++) {
            if (i % 2 === 0) {  // Fragen 1, 3, 5, 7, 9
                score += susResult.susScores[i] - 1;  // Rules for odd-numbered
            } else {  // Fragen 2, 4, 6, 8, 10
                score += 5 - susResult.susScores[i];  // Rules for even-numbered
            }
        }
        }
        //final rule
        return score * 2.5;

    }

    //Describe SUS
    static interpretSUSScore(susScore) {
        if (susScore == 100) {
            return "Perfect";
        } else if (susScore >= 70) {
            return "Good";
        } else if (susScore >= 50) {
            return "OK";
        } else {
            return "Poor";
        }
    }
}

export {SUSCalcuator};
