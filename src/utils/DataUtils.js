import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"



function columnType(columnName) {
  if (columnName.match(/^Q[1-9][0-9]*/g)) { return "questions" }
  if (columnName.match(/^T[1-9][0-9]*:/g)) { return "transform" }
  return "userInfo"
}


/**
 * Splitting raw questionnaire data object into user info object and result object.
 * @param {array} rawData 
 * @returns {[object, object]}
 */
function infoResultSplit(rawData) {
  const columns = Object.keys(rawData[0])
  const resultCols = columns.filter(col => isQuestionColumn(col))
  const userInfoCols = columns.filter(col => !isQuestionColumn(col))

  const userInfos = []
  userInfos.columns = userInfoCols
  const results = []
  results.columns = resultCols

  rawData.forEach((row) => {
    const userInfoRow = {}
    const resultRow = {}

    userInfoCols.forEach(col => userInfoRow[col] = row[col])
    resultCols.forEach(col => resultRow[col] = row[col])

    userInfos.push(userInfoRow)
    results.push(resultRow)
  })

  return [userInfos, results]
}


/**
 * Given a QUESTIONNAIRE_TYPE, produce an array of `"Q1"`, ..., `"Qn"`, where `n` is the
 * number of questions of that questionnaire type.
 * @param {object} type 
 * @returns 
 */
function generateResultColumns(type) {
  if (type === QUESTIONNAIRE_TYPE.NONE) return []
  const columns = Array(type.numOfQuestions)
  for (let i = 0; i < type.numOfQuestions; i++) {
    columns[i] = i + 1
  }
  return columns.map(i => `Q${i}`)
}


/**
 * Returns an object with keys from given columns and null values.
 * For example, input `["username", "age"]` would produce `{ username: null, age: null }`.
 * @param {string[]} columns 
 * @returns 
 */
function generateEmptyRow(columns) {
  const newRow = {}
  columns.forEach(col => {
    newRow[col] = null
  })
  return newRow
}


function parseColumnInput(input, dataEntity) {
  input = input.trim()
  if (!input.match(/^T[1-9][0-9]*$/g)) { return input }
  
  for (let col of dataEntity.transformColumns) {
    if (col.startsWith(input)) {
      console.log(col)
      return col
    }
  }
}


export {
  columnType,
  infoResultSplit,
  generateResultColumns,
  generateEmptyRow,
  parseColumnInput
}