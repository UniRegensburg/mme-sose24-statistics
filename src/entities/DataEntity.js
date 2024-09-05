/**
 * A class for representing questionnaire data.
 */
class DataEntity {

    /**
     * Construct empty DataEntity
     */
    constructor() {
        this.type = null
        this.userInfo = null
        this.result = null
    }

    /**
     * Check if the data is valid according to the type.
     * DO WE NEED THAT??
     * @return {boolean}
     */
    dataIsValid() {
        if (this.type && this.userInfo && this.result) {
            return true;
        }
        return false;
    }
    
}


/**
 * A class that contains information about users who took
 * the questionnaire.
 */
class UserInfo {
    constructor(userID, age, gender, education) {
        this.userID = userID;
        this.age = age;
        this.gender = gender;
        this.education = education;
    }

}

class SUSResult {
    constructor(userID) {
        this.userID = userID;  // Reference to class UserInfo
        this.susScores = Array(10).fill(null);  // Array of scores for the 10 SUS questions (1-5)
    }

    /**
     * Set a SUS score for a specific question.
     * @param {number} questionNr - Nr of question (0-9)
     * @param {number} score - Score of question (1-5)
     */
    setSUSScore(questionNr, score) {
        if (questionNr >= 0 && questionNr < 10 && score >= 1 && score <= 5) {
            this.susScores[questionNr] = score;
        } else {
            console.error("Problem by the SUS-Structure");
        }
    }
}

class Result {
    constructor(userID, susResult) {
        this.userID = userID;
        this.susResult = susResult; 
    }
}
    


export {DataEntity, UserInfo, SUSResult, Result};
