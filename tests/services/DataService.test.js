import { test, assert } from "vitest"
import dataService from "../../src/services/DataService"

test(
  "DataService imports csv correctly,",
  () => {
    const data = dataService.importData("./tests/test-data/SUS-example.csv")
    assert(data.results.length === 40)
    assert(data.userInfos.length === 40)
  }
)