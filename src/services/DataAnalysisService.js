import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"
import DataEntity from "../entities/DataEntity"
import { average, count } from "../utils/MathUtils"


class DataAnalysisService {

  /**
   * Calculate an array of score of a DataEntity according to its questionnaire type.
   * @param {DataEntity} dataEntity 
   */
  calculateScores(dataEntity) {
    const calculator = dataEntity.type.scoreCalculator
    return dataEntity.data.map(calculator)
  }


  /**
   * Calculate total score of a DataEntity according to its questionnaire type.
   * For most questionnaires, this means the average score.
   * @param {DataEntity} dataEntity 
   */
  calculateTotalScore(dataEntity) {
    if (dataEntity.type === QUESTIONNAIRE_TYPE.NPS) {
      return QUESTIONNAIRE_TYPE.NPS.totalScoreCalculator(dataEntity.data)
    } 
    return average(this.calculateScores(dataEntity))
  }


  getReport(dataEntity) {
    const result = {}
    result.transform = {}
    result.userInfo = {}
    result.questions = {}

    const getNumericReport = (valueArr) => {
      return {
        avg: average(valueArr)
      }
    }
    const getCategoricalReport = (valueArr) => {
      return {
        count: count(valueArr)
      }
    }


    if (dataEntity.size === 0 || !dataEntity) { return result }

    dataEntity.userInfoColumns.forEach(col => {
      if (col === "id") { return }
      const valueArr = dataEntity.col(col)
      if (typeof dataEntity.loc(0, col) === "number") {
        result.userInfo[col] = getNumericReport(valueArr)
      }
      else {
        result.userInfo[col] = getCategoricalReport(valueArr)
      }
    })
    dataEntity.questionColumns.forEach(col => {
      result.questions[col] = getNumericReport(dataEntity.col(col))
    })
    dataEntity.transformColumns.forEach(col => {
      result.transform[col] = getNumericReport(dataEntity.col(col))
    })

    if (dataEntity.type !== QUESTIONNAIRE_TYPE.NONE) {
      result.score = this.calculateTotalScore(dataEntity)
    } else {result.score = "Undefined"}

    return result
  }

}



const dataAnalysisService = new DataAnalysisService()

export default dataAnalysisService