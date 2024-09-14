import { DataEntity } from "../entities/DataEntity"
import { average } from "../utils/MathUtils"


class DataAnalysisService {

  /**
   * Calculate an array of score of a DataEntity according to its questionnaire type.
   * @param {DataEntity} dataEntity 
   */
  calculateScores(dataEntity) {
    const calculator = dataEntity.type.scoreCalculator
    return dataEntity.results.map(calculator)
  }


  /**
   * Calculate average score of a DataEntity according to its questionnaire type.
   * @param {DataEntity} dataEntity 
   */
  calculateAverageScore(dataEntity) {
    return average(this.calculateScores(dataEntity))
  }

}



const dataAnalysisService = new DataAnalysisService()

export default dataAnalysisService