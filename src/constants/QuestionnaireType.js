import { QuestionnaireTypeError } from "../exceptions/DataExceptions";


/**
 * Contains necessary information of all available questionnaires types.
 * The following types are currently available:
 * @param {object} NONE
 * @param {object} UEQ
 * @param {object} SUS
 * @param {object} rawTLX
 * @param {object} NPS
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
    throw new QuestionnaireTypeError("Score calculator is not defined for NONE-type questionnaire.")
  },
  scoreInterpretor: () => {
    throw new QuestionnaireTypeError("Score interpretor is not defined for NONE-type questionnaire.")
  }
}

QUESTIONNAIRE_TYPE.UEQ = {
  name: "UEQ",
  numOfQuestions: 26,
  minValue: -3,  
  maxValue: 3,
  // Categories of the UEQ
  categories: {
    attractiveness: [1, 2, 3, 4, 5, 6],
    perspicuity: [7, 8, 9, 10, 11, 12],
    efficiency: [13, 14, 15, 16],
    dependability: [17, 18, 19, 20],
    stimulation: [21, 22, 23],
    novelty: [24, 25, 26]
  },

  // Calculate UEQ-Score
  scoreCalculator: (ueqResult) => {
    let scores = {};

    // UEQ-Score pro Category
    for (let category in QUESTIONNAIRE_TYPE.UEQ.categories) {
      let questionIndices = QUESTIONNAIRE_TYPE.UEQ.categories[category];
      let categoryScoreUEQ = 0;

      // Sum of questions pro category
      for (let i = 0; i < questionIndices.length; i++) {
        let qIndex = questionIndices[i];
        categoryScoreUEQ += ueqResult[`Q${qIndex}`];
      }

      //  mean for every category
      scores[category] = categoryScoreUEQ / questionIndices.length;
    }

    return scores;
  },

  scoreInterpretor: (categoryScoreUEQ) => {
    if (categoryScoreUEQ > 1.5) {
      return "Excellent";
    } else if (categoryScoreUEQ > 0.5) {
      return "Good";
    } else if (categoryScoreUEQ >= -0.5) {
      return "Neutral";
    } else {
      return "Poor";
    }
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

QUESTIONNAIRE_TYPE.rawTLX = {
  name: "rawTLX",
  numOfQuestions: 6,
  minValue: 0,
  maxValue: 20,

  scoreCalculator: (rawtxlresults) => {
    let score = 0;

    // rawTLX-Score
    for (let i = 1; i <= 6; i++) {
        score += rawtxlresults[`Q${i}`];  // sum the scores
    }
    //final rule
    return score / 6;
  },

  scoreInterpretor: (rawtxtlscore) => {
    let scaledtxlscore = rawtxtlscore * 5;
    if (scaledtxlscore >= 75) {
      return "Very High Workload";
    } else if (scaledtxlscore >= 25) {
      return "Moderate Workload";
    } else {
      return "Very Low Workload";
    }
  }
}

QUESTIONNAIRE_TYPE.NPS = {
  name: "NPS",
  numOfQuestions: 1,
  minValue: 0,
  maxValue: 10,

  // NPS does not define score for individual
  scoreCalculator: result => result["Q1"],

  totalScoreCalculator: (npsresults) => {
    let promoters = 0;
    let detractors = 0;
    let neutrals = 0;
    let numberResponses = npsresults.length;

    // nps-Score
    for (let i = 0; i < npsresults.length; i++) {
      let score = npsresults[i].Q1

      if (score >= 9){
        promoters++;
      }
      else if (score <= 6){
        detractors++;
      }
      else{
        neutrals++;
      }
    }
    let npsScore = ((promoters - detractors)/numberResponses)*100;
    return npsScore;
  },

  scoreInterpretor: (npsScore) => {
    if (npsScore >= 30) {
      return "Good NPS";
    } else if (npsScore >= -30) {
      return "Moderate NPS";
    } else {
      return "Bad NPS";
    }
  }
}


Object.freeze(QUESTIONNAIRE_TYPE)

export default QUESTIONNAIRE_TYPE