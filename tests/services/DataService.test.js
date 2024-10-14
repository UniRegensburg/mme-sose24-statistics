import { test, assert } from "vitest"
import { readFileSync } from "fs"
import dataService from "../../src/services/DataService"
import { arraysEqual } from "../TestUtils"
import { readFileSync } from "fs"
import QUESTIONNAIRE_TYPE from "../../src/constants/QuestionnaireType"


const string = readFileSync("./tests/test-data/SUS-example.csv").toString()
const data = dataService.deserialize(string, QUESTIONNAIRE_TYPE.SUS)

test(
  "DataService imports CSV correctly.",
  () => {
    assert(data.size === 40)

    const importedUserInfoCols = data.userInfoColumns
    const correctUserInfoCols = ["id", "age", "gender"]
    assert(
      arraysEqual(importedUserInfoCols, correctUserInfoCols),
      "User Info columns imported correctly."
    )

    const importedResultCols = data.questionColumns
    const correctResultCols = ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10"]
    assert(
      arraysEqual(importedResultCols, correctResultCols),
      "Result columns imported correctly."
    )
  }
)

test(
  "DataService stringifies DataEntity correctly.",
  () => {
    const correctCsv = readFileSync("./tests/test-data/SUS-example.csv").toString()
    const stringifiedData = dataService.serialize(data)
    assert(stringifiedData === correctCsv)
  }
)