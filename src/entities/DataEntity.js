import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"
import { InvalidDataInputError, QuestionnaireTypeError } from "../exceptions/DataExceptions"
import { generateEmptyRow, generateResultColumns, isQuestionColumn } from "../utils/DataUtils"


/**
 * A class for representing a series of questionnaire data.
 * 
 */
export default class DataEntity {

  /**
   * Constructor
   * @param {object} type Type of questionnaire. `DATA_TYPE.NONE` by default.
   * @param {UserInfo[]} userInfos A list of users' information.
   * @param {object[]} results A list of questionnaire results.
   */
  constructor(type=QUESTIONNAIRE_TYPE.NONE, userInfos=[], results=[]) {
    this.type = type
    this.userInfos = userInfos
    this.results = results

    if (!this.userInfos || userInfos.length === 0) { this.userInfosColumns = [] }
    else { this.userInfosColumns = Object.keys(userInfos[0]) }

    if (!this.results || results.length === 0) { 
      this.resultsColumns = generateResultColumns(type) 
    }
    else { this.resultsColumns = Object.keys(results[0]) }
  }



  /*************************
   * Column operations
   *************************/

  /**
   * Add given number of new questions to the questionnaire.
   * @param {number} numOfQuestions 
   */
  addQuestions(numOfQuestions=1) {
    if (this.type !== QUESTIONNAIRE_TYPE.NONE) {
      throw new QuestionnaireTypeError("Only NONE-type data allows adding new questions.")
    }
    for (let i = 0; i < numOfQuestions; i++) {
      const newCol = `Q${this.numOfQuestions + 1}`
      this.resultsColumns.push(newCol)
      this.results.forEach(row => row[newCol] = null)
    }
  }

  /**
   * Delete given number of new questions to the questionnaire.
   * @param {number} numOfQuestions 
   */
  deleteQuestions(numOfQuestions=1) {
    if (this.type !== QUESTIONNAIRE_TYPE.NONE) {
      throw new QuestionnaireTypeError("Only NONE-type data allows deleting questions.")
    }
    for (let i = 0; i < numOfQuestions; i++) {
      const deletedCol = this.resultsColumns.pop()
      this.results.forEach(row => delete row[deletedCol])
    }
  }

  setNumOfQUestions(numOfQuestions) {
    if (this.type !== QUESTIONNAIRE_TYPE.NONE) {
      throw new QuestionnaireTypeError("Only NONE-type data allows setting number of questions.")
    }
    const difference = numOfQuestions - this.numOfQuestions
    if (difference === 0) { return }
    if (difference >= 0) { this.addQuestions(difference) }
    else { this.deleteQuestions(difference) }
  }

  /**
   * Given a string or an array of strings, add new strings among them as user info columns.
   * @param {string | string[]} columns 
   */
  addUserInfoColumns(columns) {
    if (typeof columns === "string") { columns = [columns] }
    columns = columns.filter(col => !this.userInfosColumns.includes(col))
    
    this.userInfosColumns = this.userInfosColumns.concat(columns)
    columns.forEach(col => {
      this.userInfos.forEach(row => row[col] = null)
    })
  }

  /**
   * Given a string or an array of strings, delete user info columns of those names.
   * @param {string | string[]} columns 
   */
  deleteUserInfoColumns(columns) {
    if (typeof columns === "string") { columns = [columns] }
    
    this.userInfosColumns = this.userInfosColumns.filter(col => !columns.includes(col))
    columns.forEach(col => {
      this.userInfos.forEach(row => delete row[col])
    })
  }



  /**
  /*************************
   * Row operations
   *************************/

  /**
   * Append given number of empty rows to the data.
   * @param {number} numberOfRows 
   */
  addEmptyRows(numberOfRows=1) {
    for (let i = 0; i < numberOfRows; i++) {
      this.userInfos.push(generateEmptyRow(this.userInfosColumns))
      this.results.push(generateEmptyRow(this.resultsColumns))
    }
  }

  /**
   * In sert 1 empty row at the given index.
   * @param {number} index 
   */
  insertEmptyRow(index) {
    const newUserInfoRow = generateEmptyRow(this.userInfosColumns)
    const newResultRow = generateEmptyRow(this.resultsColumns)
    this.userInfos.splice(index, 0, newUserInfoRow)
    this.results.splice(index, 0, newResultRow)
  }



  /*************************
   * Data manipulation
   *************************/

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

  /**
   * Set user info value.
   * @param {number} rowNr 
   * @param {string} column 
   * @param {number} value 
   */
  setUserInfoValue(rowNr, column, value) {
    if (!this.userInfosColumns.includes(column)) {
      throw new InvalidDataInputError(`User info column "${column}" does not exist. Valid columns
        are [${this.userInfosColumns}]`)
    }
    this.userInfos[rowNr][column] = value
  }

  /**
   * Set value at given column and row number.
   * @param {number} rowNr
   * @param {string} column 
   * @param {number} value 
   */
  setValue(rowNr, column, value) {
    if (isQuestionColumn(column)) {
      const questionNr = parseInt(column.substring(1))
      this.setResultValue(rowNr, questionNr, value)
    }
    else { this.setUserInfoValue(rowNr, column, value) }
  }



  /*************************
   * Getters
   *************************/

  get size() {
    return this.userInfos.length
  }

  get numOfQuestions() {
    return this.resultsColumns.length
  }

  get columns() {
    return this.userInfosColumns.concat(this.resultsColumns)
  }

  row(rowNumber) {
    return {
      userInfo: this.userInfos[rowNumber],
      result: this.results[rowNumber]
    }
  }

  loc(rowNr, column) {
    if (isQuestionColumn(column)) {
      return this.results[rowNr][column]
    }
    return this.userInfos[rowNr][column]
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
