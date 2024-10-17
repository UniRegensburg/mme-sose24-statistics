import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"
import DataEntity from "../entities/DataEntity"
import { average, count, groupAverage } from "../utils/MathUtils"


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
    if (dataEntity.type === QUESTIONNAIRE_TYPE.UEQ) {
      return groupAverage(this.calculateScores(dataEntity))
    }
    return average(this.calculateScores(dataEntity))
  }

  interpretTotalScore(dataEntity, score) {
    return dataEntity.type.scoreInterpretor(score)
  }


  getReport(dataEntity) {
    if (!dataEntity || dataEntity.size === 0) { return null }

    const result = {}
    result.dataSize = dataEntity.size
    if (dataEntity.type !== QUESTIONNAIRE_TYPE.NONE) {
      result.score = {
        name: dataEntity.type.name,
        value: this.calculateTotalScore(dataEntity),
        interpretation: this.interpretTotalScore(dataEntity, result.score)
      }
    } else {
      result.score = "Score is not defined for NONE-type data"
    }
    result.columns = {
      userInfo: {},
      questions: {},
      transform: {},
    }

    const getNumericReport = (valueArr) => {
      return {
        average: average(valueArr)
      }
    }
    const getCategoricalReport = (valueArr) => {
      return {
        count: count(valueArr)
      }
    }


    dataEntity.userInfoColumns.forEach(col => {
      if (col === "id") { return }
      const valueArr = dataEntity.col(col)
      if (typeof dataEntity.loc(0, col) === "number") {
        result.columns.userInfo[col] = getNumericReport(valueArr)
      }
      else {
        result.columns.userInfo[col] = getCategoricalReport(valueArr)
      }
    })
    dataEntity.questionColumns.forEach(col => {
      result.columns.questions[col] = getNumericReport(dataEntity.col(col))
    })
    dataEntity.transformColumns.forEach(col => {
      result.columns.transform[col] = getNumericReport(dataEntity.col(col))
    })


    return result
  }

}



const dataAnalysisService = new DataAnalysisService()

export default dataAnalysisService