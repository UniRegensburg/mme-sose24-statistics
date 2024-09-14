import { test, assert } from "vitest"
import dataService from "../../src/services/DataService"
import { arraysEqual } from "../TestUtils"

test(
  "DataService imports csv correctly,",
  () => {
    const data = dataService.importData("./tests/test-data/SUS-example.csv")
    assert(data.results.length === 40)
    assert(data.userInfos.length === 40)

    const importedUserInfoCols = data.userInfos.columns
    const correctUserInfoCols = ["id", "age", "gender"]
    assert(
      arraysEqual(importedUserInfoCols, correctUserInfoCols),
      "User Info columns imported correctly."
    )

    const importedResultCols = data.results.columns
    const correctResultCols = ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10"]
    assert(
      arraysEqual(importedResultCols, correctResultCols),
      "Result columns imported correctly."
    )

  }
)