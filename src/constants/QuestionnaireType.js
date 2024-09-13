import { UndefinedEvaluationError } from "../exceptions/DataExceptions";


/**
 * Contains necessary information of all available questionnaires types.
 * The following types are currently available:
 * @param {object} NONE
 * @param {object} SUS
 * 
 * Each type must include following information:
 * @param {string} name Name of the type.
 * @param {number} numOfQuestions Number of questions contained in the questionnaire.
 * @param {number} minValue Minimum result value.
 * @param {number} maxValue Maximum result value.
 * @param {function} scoreCalculator A function that calculates score for a single row of result. 
 * @param {function} scoreInterpretor A function that interprets score. 
 */
const QUESTIONNAIRE_TYPE = {}


QUESTIONNAIRE_TYPE.NONE = {
  name: "NONE",
  numOfQuestions: Number.MAX_SAFE_INTEGER,
  minValue: Number.MIN_SAFE_INTEGER,
  maxValue: Number.MAX_SAFE_INTEGER,
  scoreCalculator: () => {
    throw new UndefinedEvaluationError("Score calculator is not defined for NONE-type questionnaire.")
  },
  scoreInterpretor: () => {
    throw new UndefinedEvaluationError("Score interpretor is not defined for NONE-type questionnaire.")
  }
}


QUESTIONNAIRE_TYPE.SUS = {
  name: "SUS",
  numOfQuestions: 10,
  minValue: 1,
  maxValue: 5,

  scoreCalculator: (susResult) => {
    let score = 0;

    // SUS-Score
    for (let i = 1; i <= 10; i++) {
      if (i % 2 === 1) {  // Fragen 1, 3, 5, 7, 9
        score += susResult[`Q${i}`] - 1;  // Rules for odd-numbered
      } else {  // Fragen 2, 4, 6, 8, 10
        score += 5 - susResult[`Q${i}`];  // Rules for even-numbered
      }
    }
    //final rule
    return score * 2.5;
  },

  scoreInterpretor: (susScore) => {
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




Object.freeze(QUESTIONNAIRE_TYPE)

export default QUESTIONNAIRE_TYPE