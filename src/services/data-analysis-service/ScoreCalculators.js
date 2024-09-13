import QUESTIONNAIRE_TYPE from "../../constants/questionnaire-type";


/**
 * Find the corresponding calculator according to the questionnaire type.
 * @param {object} type Type of questionnaire.
 * @returns {function} Corresponding calculator function.
 */
export default function getCalculator(type) {
  if (type === QUESTIONNAIRE_TYPE.NONE) {
    throw new Error("Evaluation of the data is undefined.")
  }
  else if (type === QUESTIONNAIRE_TYPE.SUS) {
    return calculateSUSScore
  }
}


function calculateSUSScore(susResult) {
  let score = 0;

  // SUS-Score
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {  // Fragen 1, 3, 5, 7, 9
      score += susResult.susScores[i] - 1;  // Rules for odd-numbered
    } else {  // Fragen 2, 4, 6, 8, 10
      score += 5 - susResult.susScores[i];  // Rules for even-numbered
    }
  }
  //final rule
  return score * 2.5;

}


//Describe SUS
function interpretSUSScore(susScore) {
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