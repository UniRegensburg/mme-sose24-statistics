import { DataEntity } from "../../entities/DataEntity"
import { average } from "../../utils/MathUtils"


class DataAnalysisService {

  /**
   * Calculate average score of a DataEntity according to its questionnaire type.
   * @param {DataEntity} dataEntity 
   */
  calculateScore(dataEntity) {
    const calculator = dataEntity.type.scoreCalculator
    const scores = dataEntity.results.map(calculator)
    console.log(`scores are ${scores}`)
    return average(scores)
  }
}

const dataAnalysisService = new DataAnalysisService()


export default dataAnalysisService