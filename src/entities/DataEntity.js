import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"
import { InvalidDataInputError, QuestionnaireTypeError } from "../exceptions/DataExceptions"
import { evaluate } from "../utils/Evaluation"
import { columnType, generateEmptyRow } from "../utils/DataUtils"


/**
 * A class for representing a series of questionnaire data.
 */
export default class DataEntity {

  /**
   * Constructor
   * @param {object} type Type of questionnaire. `DATA_TYPE.NONE` by default.
   * @param {UserInfo[]} userInfos A list of users' information.
   * @param {object[]} results A list of questionnaire results.
   */
  constructor(type=QUESTIONNAIRE_TYPE.NONE, data=[]) {
    this.type = type
    this.data = data
    this.columns = { userInfo: [], questions: [], transform: [] }
    this.transformId = 1

    if (data.length === 0) { return }
    this.columns.questions = Object.keys(data[0]).filter(k => columnType(k) === "questions")
    this.columns.userInfo = Object.keys(data[0]).filter(k => columnType(k) === "userInfo")
    this.columns.transform = Object.keys(data[0]).filter(k => columnType(k) === "transform")
    if (type !== QUESTIONNAIRE_TYPE.NONE) {
      this.setNumOfQuestions(type.numOfQuestions)
      console.log(this.columns)
    }
  }



  /*************************
   * Column operations
   *************************/

  /**
   * Add given number of new questions to the questionnaire.
   * @param {number} numOfQuestions 
   */
  addQuestions(numOfQuestions=1) {
    // if (this.type !== QUESTIONNAIRE_TYPE.NONE) {
    //   throw new QuestionnaireTypeError("Only NONE-type data allows adding new questions.")
    // }
    for (let i = 0; i < numOfQuestions; i++) {
      const newCol = `Q${this.numOfQuestions + 1}`
      this.columns.questions.push(newCol)
      this.data.forEach(row => row[newCol] = null)
    }
  }

  /**
   * Delete given number of new questions to the questionnaire.
   * @param {number} numOfQuestions 
   */
  deleteQuestions(numOfQuestions=1) {
    // if (this.type !== QUESTIONNAIRE_TYPE.NONE) {
    //   throw new QuestionnaireTypeError("Only NONE-type data allows deleting questions.")
    // }
    for (let i = 0; i < numOfQuestions; i++) {
      const deletedCol = this.columns.questions.pop()
      this.data.forEach(row => delete row[deletedCol])
    }
  }

  setNumOfQuestions(numOfQuestions) {
    // if (this.type !== QUESTIONNAIRE_TYPE.NONE) {
    //   throw new QuestionnaireTypeError("Only NONE-type data allows setting number of questions.")
    // }
    const difference = numOfQuestions - this.numOfQuestions
    if (difference === 0) { return }
    if (difference > 0) { this.addQuestions(difference) }
    else { this.deleteQuestions(-difference) }
  }

  /**
   * Given a string or an array of strings, add new strings among them as user info columns.
   * @param {string | string[]} columns 
   */
  addUserInfoColumns(column) {
    if (Array.isArray(column)) {
      column.forEach(col => this.addUserInfoColumns(col))
      return
    }
    if (this.userInfoColumns.includes(column)) { return }
    
    this.columns.userInfo.push(column)
    this.data.forEach(row => row[column] = null)
  }

  /**
   * Given a string or an array of strings, delete user info columns with those names.
   * @param {string | string[]} columns 
   */
  deleteUserInfoColumns(columns) {
    if (typeof columns === "string") { columns = [columns] }
    
    this.userInfoColumns = this.userInfoColumns.filter(col => !columns.includes(col))
    columns.forEach(col => {
      this.data.forEach(row => delete row[col])
    })
  }

  /**
   * Given a string, create transform columns with those name and
   * fill those columns with the transformed data.
   * @param {string} expressions 
   */
  addTransformColumns(expression) {
    if (Array.isArray(expression)) {
      expression.forEach(expr => this.addTransformColumns(expr))
      return
    }

    let column = `T${this.transformId}:${expression}`
    if (this.transformColumns.includes(column)) { return }
    
    const results = evaluate(expression, this)
    this.data.forEach((row, rowNr) => row[column] = results[rowNr])

    this.columns.transform.push(column)
    this.transformId++
  }

  /**
   * Given a string or an array of strings, delete columns with those names.
   * @param {string | string[]} columns 
   */
  deleteColumns(columns) {
    if (typeof columns === "string") { columns = [columns] }

    this.columns.userInfo = this.columns.userInfo.filter(col => !columns.includes(col))
    this.columns.transform = this.columns.transform.filter(col => !columns.includes(col))
    columns.forEach(col => {
      this.data.forEach(row => delete row[col])
    })
  }



  /*************************
   * Row operations
   *************************/

  /**
   * Append given number of empty rows to the data.
   * @param {number} numberOfRows 
   */
  addEmptyRows(numberOfRows=1) {
    for (let i = 0; i < numberOfRows; i++) {
      this.data.push(generateEmptyRow(this.allColumns))
    }
  }

  /**
   * Insert 1 empty row at the given index.
   * @param {number} index 
   */
  insertEmptyRow(index) {
    const newRow = generateEmptyRow(this.allColumns)
    this.data.splice(index, 0, newRow)
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
      throw new InvalidDataInputError(`Question number should be bewteen 
        1 and ${this.numOfQuestions}. Your question number was ${questionNr}.`)
    }
    if (value < this.type.minValue || this.type.maxValue < value || typeof value !== "number") {
        throw new InvalidDataInputError(`Input value for ${this.type.name} quesitonnaires must be
          a number between ${this.type.minValue} and ${this.type.maxValue}.`)
    }
    const targetColumn = `Q${questionNr}`
    this.data[rowNr][targetColumn] = value
  }

  /**
   * Set user info value.
   * @param {number} rowNr 
   * @param {string} column 
   * @param {number} value 
   */
  setUserInfoValue(rowNr, column, value) {
    if (!this.userInfoColumns.includes(column)) {
      throw new InvalidDataInputError(`User info column "${column}" does not exist. Valid columns
        are [${this.userInfoColumns}]`)
    }
    this.data[rowNr][column] = value
  }

  /**
   * Set value at given row number and column.
   * @param {number} rowNr
   * @param {string} column 
   * @param {number} value 
   */
  setValue(rowNr, column, value) {
    const colType = columnType(column)
    if (colType === "questions") {
      const questionNr = parseInt(column.substring(1))
      this.setResultValue(rowNr, questionNr, value)
    }
    else if (colType === "userInfo") { this.setUserInfoValue(rowNr, column, value) }
    else {
      throw new InvalidDataInputError("Data in transform columns cannot be manually changed.")
    }
  }

  setType(type) {
    this.type = type
    if (type === QUESTIONNAIRE_TYPE.NONE) { return }
    this.setNumOfQuestions(type.numOfQuestions)
  }



  /*************************
   * Getters
   *************************/

  get size() { return this.data.length }

  get numOfQuestions() { return this.questionColumns.length }

  get allColumns() {return this.userInfoColumns.concat(this.questionColumns, this.transformColumns)}

  get userInfoColumns() { return this.columns.userInfo}

  get questionColumns() { return this.columns.questions }

  get transformColumns() { return this.columns.transform }

  getType() { return this.type.name }

  row(rowNumber) { return this.data[rowNumber] }

  col(colName) {
    const allColumns = this.allColumns
    if (!allColumns.includes(colName)) {
      throw new Error(`Data does not contain column "${colName}".`)
    }
    return this.data.map(row => row[colName])
  }

  loc(rowNr, column) { return this.data[rowNr][column] }
  
}

