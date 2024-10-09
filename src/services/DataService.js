import * as d3 from "d3"
import DataEntity from "../entities/DataEntity"
import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"
import { columnType } from "../utils/DataUtils"
import { QuestionnaireTypeError } from "../exceptions/DataExceptions"


class DataService {

  async importData(filePath, type=QUESTIONNAIRE_TYPE.NONE) {
    const data = await d3.csv(filePath, d3.autoType)
    if (type !== QUESTIONNAIRE_TYPE.NONE || 
      data.columns.filter(col => columnType(col) === "questions").length !== type.numOfQuestions
    ) {
      throw new QuestionnaireTypeError(`${type.name} type questionnaire must have exactly 
        ${type.numOfQuestions} question columns.`)
    }
    const dataEntity = new DataEntity(type, data)
    this.generateId(dataEntity)
    return dataEntity
  }


  /**
   * Generate unique id for each row of data. This is required by MUI DataGrid.
   * @param {DataEntity} dataEntity 
   */
  generateId(dataEntity) {
    if (dataEntity.userInfoColumns.includes("id")) { return }
    dataEntity.addUserInfoColumns("id")
    for (let i = 0; i < dataEntity.size; i++) {
      dataEntity.setValue(i, "id", i + 1)
    }
  }


  /**
   * Return a string of CSV format representing the data entity.
   * @param {DataEntity} dataEntity 
   */
  serialize(dataEntity) {
    const headers = dataEntity.allColumns.toString()
    const lines = dataEntity.data.map(r => Object.values(r).toString())
    return `${headers}\r\n${lines.join("\r\n")}`
  }

  deserialize(string, type=QUESTIONNAIRE_TYPE.NONE) {
    const data = d3.csvParse(string)
    return new DataEntity(type, data)
  }

}



const dataService = new DataService()

export default dataService