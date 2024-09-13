import { csvParse } from "d3"
import { readFileSync } from "fs"
import { DataEntity } from "../entities/DataEntity"
import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"


class DataService {

	importData(filePath, type=QUESTIONNAIRE_TYPE.NONE) {
    const rawData = csvParse(readFileSync(filePath).toString())
    const [userInfos, results] = infoResultSplit(rawData)
    return new DataEntity(type, userInfos, results)
	}

}


/**
 * Splitting raw questionnaire data object into user info object and result object.
 * @param {object} rawData 
 * @returns {[object, object]}
 */
function infoResultSplit(rawData) {
  const isInfoColumn = rawData.columns.map((value) => value.match(/Q[1-9][0-9]*/g))

  const userInfos = []
  const results = []

  rawData.forEach((row) => {
    const userInfoRow = {}
    const resultRow = {}

    rawData.columns.forEach((value, index) => {
      if (isInfoColumn[index]) {
        userInfoRow[value] = row[value]
      }
      else {
        resultRow[value] = row[value]
      }
    })
    userInfos.push(userInfoRow)
    results.push(resultRow)
  })

  return [userInfos, results]
}



const dataService = new DataService()

export default dataService