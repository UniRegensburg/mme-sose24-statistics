import { csvParse } from "d3"
import { readFileSync } from "fs"
import { DataEntity } from "../entities/DataEntity"
import QUESTIONNAIRE_TYPE from "../constants/QuestionnaireType"
import { infoResultSplit } from "../utils/DataUtils"


class DataService {

	importData(filePath, type=QUESTIONNAIRE_TYPE.NONE) {
    const rawData = csvParse(readFileSync(filePath).toString())
    const [userInfos, results] = infoResultSplit(rawData)
    return new DataEntity(type, userInfos, results)
	}

}



const dataService = new DataService()

export default dataService