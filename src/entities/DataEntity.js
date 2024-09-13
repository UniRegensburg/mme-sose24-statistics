import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"
import { InvalidDataInputError } from "../exceptions/DataExceptions"


/**
 * A class for representing a series of questionnaire data.
 * 
 */
class DataEntity {

  /**
   * Constructor
   * @param {object} type Type of questionnaire. `DATA_TYPE.NONE` by default.
   * @param {UserInfo[]} userInfos A list of users' information. `null` by default.
   * @param {object[]} results A list of questionnaire results. `null` by default.
   */
  constructor(type = QUESTIONNAIRE_TYPE.NONE, userInfos = [], results = []) {
    this.type = type
    this.userInfos = userInfos
    this.results = results
  }

  /**
   * Set questionnaire result value.
   * @param {number} rowNr Target row.
   * @param {number} questionNr Target question number.
   * @param {number} value Value to change to.
   * @returns 
   */
  setResultValue(rowNr, questionNr, value) {
    if (value < this.type.minValue || this.type.maxValue < value) {
      throw new InvalidDataInputError(`Error at row ${rowNr}. Input value should be between 
        ${this.type.minValue} and ${this.type.maxValue}. Your input value was ${value}.`)
    }
    if (questionNr < 0 || this.type.numOfQuestions <= questionNr) {
      throw new InvalidDataInputError(`Error at row ${rowNr}. Question number should be bewteen 
        0 and ${this.type.numOfQuestions - 1}. Your question number was ${questionNr}.`)
    }
    this.results[rowNr][`Q${questionNr}`] = value
  }

  insertEmptyRow(index) {
    this.userInfos.splice(index, 0, {})
    this.results.splice(index, 0, {})
  }

  getSize() {
    return this.userInfos.length
  }
  

  /**
   * Check if the data is valid according to the type.
   * @return {boolean}
   */
  isValid() {
    return (
      this.userInfos.length === this.results.length
    )
  }

}


/**
 * A class that contains information about users who took
 * the questionnaire.
 */
// class UserInfo {

//   constructor(userID=null, age=null, gender=null, education=null) {
//     this.userID = userID;
//     this.age = age;
//     this.gender = gender;
//     this.education = education;
//   }

// }


export { DataEntity };
