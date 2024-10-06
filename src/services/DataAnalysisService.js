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

  interpretTotalScore(dataEntity, score) {
    return dataEntity.type.scoreInterpretor(score)
  }


  getReport(dataEntity) {
    const result = {}
    result.transform = {}
    result.userInfo = {}
    result.questions = {}

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


    if (!dataEntity || dataEntity.size === 0) { return result }

    result.dataSize = dataEntity.size

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
      this.score = {}
      result.score.value = this.calculateTotalScore(dataEntity)
      result.score.interpretation = this.interpretTotalScore(result.score)
    } else {
      result.score = null
    }

    return result
  }

}



const dataAnalysisService = new DataAnalysisService()

export default dataAnalysisService