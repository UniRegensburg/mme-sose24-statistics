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
   * Calculate average score of a DataEntity according to its questionnaire type.
   * @param {DataEntity} dataEntity 
   */
  calculateAverageScore(dataEntity) {
    return average(this.calculateScores(dataEntity))
  }


  getReport(dataEntity) {
    const result = {}
    result.userInfo = {}
    result.transform = {}
    if (dataEntity.size === 0 || !dataEntity) { return result }

    dataEntity.userInfoColumns.forEach(col => {
      if (col === "id") { return }
      const valueArr = dataEntity.col(col)
      if (typeof dataEntity.loc(0, col) === "number") {
        result.userInfo[col] = {
          avg: average(valueArr)
        }
      }
      else {
        result.userInfo[col] = count(valueArr)
      }
    })

    return result
  }

}



const dataAnalysisService = new DataAnalysisService()

export default dataAnalysisService