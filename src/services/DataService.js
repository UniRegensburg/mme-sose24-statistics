import { csvParse } from "d3"
import { readFileSync, writeFileSync } from "fs"
import DataEntity from "../entities/DataEntity"
import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"


class DataService {

  importData(filePath, type=QUESTIONNAIRE_TYPE.NONE) {
    const data = csvParse(readFileSync(filePath).toString())
    return new DataEntity(type, data)
  }

  exportData(filePath, dataEntity) {
    writeFileSync(filePath, this.stringify(dataEntity))
  }

  /**
   * Return a string of CSV format representing the data entity.
   * @param {DataEntity} dataEntity 
   */
  stringify(dataEntity) {
    const headers = dataEntity.allColumns.toString()
    const lines = dataEntity.data.map(r => Object.values(r).toString())
    return `${headers}\r\n${lines.join("\r\n")}`
  }

}



const dataService = new DataService()

export default dataService