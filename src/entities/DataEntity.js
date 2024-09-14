import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"
import { InvalidDataInputError, QuestionnaireTypeError } from "../exceptions/DataExceptions"
import { generateEmptyRow, generateResultColumns } from "../utils/DataUtils"


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
  constructor(type=QUESTIONNAIRE_TYPE.NONE, userInfos=[], results=[]) {
    this.type = type
    this.userInfos = userInfos
    this.results = results

    if (!this.userInfos || userInfos.length === 0) this.userInfosColumns = []
    else this.userInfosColumns = Object.keys(userInfos[0])

    if (!this.results || this.results.length === 0) this.resultsColumns = generateResultColumns(type)
    else this.resultsColumns = Object.keys(results[0])
  }

  addQuestions(numOfNewQuestions=1) {
    if (this.type !== QUESTIONNAIRE_TYPE.NONE) {
      throw new QuestionnaireTypeError("Only NONE-type data allows adding new questions.")
    }
    for (let i = 0; i < numOfNewQuestions; i++) {
      const newCol = `Q${this.numOfQuestions + 1}`
      this.resultsColumns.push(newCol)
      this.results.forEach(row => row[newCol] = null)
    }
  }

  /**
   * Given a string or an array of string, add new strings among them as user info columns.
   * @param {string | string[]} newColumns 
   */
  addUserInfoColumns(newColumns) {
    if (typeof newColumns === "string") newColumns = [newColumns]
    newColumns = newColumns.filter(col => !this.userInfosColumns.includes(col))
    
    this.userInfosColumns = this.userInfosColumns.concat(newColumns)
    newColumns.forEach(col => {
      this.userInfos.forEach(row => row[col] = null)
    })
  }

  /**
   * Set questionnaire result value.
   * @param {number} rowNr Target row.
   * @param {number} questionNr Target question number, starting from 1.
   * @param {number} value Value to change to.
   * @returns 
   */
  setResultValue(rowNr, questionNr, value) { 
    if (questionNr <= 0 || this.numOfQuestions < questionNr) {
      throw new InvalidDataInputError(`Error at row ${rowNr}. Question number should be bewteen 
        1 and ${this.numOfQuestions}. Your question number was ${questionNr}.`)
    }
    if (value < this.type.minValue || this.type.maxValue < value) {
        throw new InvalidDataInputError(`Error at row ${rowNr}. Input value should be between 
          ${this.type.minValue} and ${this.type.maxValue}. Your input value was ${value}.`)
    }
    const targetColumn = `Q${questionNr}`
    this.results[rowNr][targetColumn] = value
  }

  addEmptyRows(numberOfRows=1) {
    for (let i = 0; i < numberOfRows; i++) {
      this.userInfos.push(generateEmptyRow(this.userInfosColumns))
      this.results.push(generateEmptyRow(this.resultsColumns))
    }
  }

  insertEmptyRow(index) {
    const newUserInfoRow = generateEmptyRow(this.userInfosColumns)
    const newResultRow = generateEmptyRow(this.resultsColumns)
    this.userInfos.splice(index, 0, newUserInfoRow)
    this.results.splice(index, 0, newResultRow)
  }

  get size() {
    return this.userInfos.length
  }

  get numOfQuestions() {
    return this.resultsColumns.length
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
