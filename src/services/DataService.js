import { csvParse } from "d3"
import { readFileSync, write, writeFileSync } from "fs"
import { DataEntity } from "../entities/DataEntity"
import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"
import { infoResultSplit } from "../utils/DataUtils"


class DataService {

  importData(filePath, type=QUESTIONNAIRE_TYPE.NONE) {
    const rawData = csvParse(readFileSync(filePath).toString())
    const [userInfos, results] = infoResultSplit(rawData)
    return new DataEntity(type, userInfos, results)
  }

  exportData(filePath, dataEntity) {
    writeFileSync(filePath, this.stringify(dataEntity))
  }

  /**
   * Return a string of CSV format representing the data entity.
   * @param {DataEntity} dataEntity 
   */
  stringify(dataEntity) {
    const headers = dataEntity.userInfosColumns
                      .concat(dataEntity.resultsColumns)
                      .toString()

    const lines = Array(dataEntity.size)
    for (let row = 0; row < dataEntity.size; row++) {
      let userInfoLine = Object.values(dataEntity.userInfos[row]).toString()
      let resultLine = Object.values(dataEntity.results[row]).toString()

      if (!resultLine) lines[row] = userInfoLine
      else if (!userInfoLine) lines[row] = resultLine
      else lines[row] = `${userInfoLine},${resultLine}`
    }

    return `${headers}\r\n${lines.join("\r\n")}`
  }

}



const dataService = new DataService()

export default dataService