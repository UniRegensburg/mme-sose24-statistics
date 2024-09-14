import { test, expect, assert } from "vitest";
import QUESTIONNAIRE_TYPE from "../../src/constants/QuestionnaireType";
import { DataEntity } from "../../src/entities/DataEntity";
import dataAnalysisService from "../../src/services/DataAnalysisService";
import { QuestionnaireTypeError } from "../../src/exceptions/DataExceptions";


test(
  "DataAnalysisService does not calculate score for NONE-type data.",
  () => {
    const testDataEntity = generateDataEntity(
      QUESTIONNAIRE_TYPE.NONE,
      [[5,5,5,5,5,5,5,5,5,5,5,5,5]]
    )
    expect(() => dataAnalysisService.calculateAverageScore(testDataEntity))
      .toThrow(QuestionnaireTypeError)
  }
)


test(
  "DataAnalysisService calculates SUS correctly.",
  () => {
    const testDataEntity = generateDataEntity(
      QUESTIONNAIRE_TYPE.SUS,
      [
        [3,3,3,3,3,3,3,3,3,3],
        [5,5,5,5,5,5,5,5,5,5]
      ]
    )
    const susScore = dataAnalysisService.calculateAverageScore(testDataEntity)
    assert(susScore === 50, "Test SUS data should have SUS score 50.")
  }
)


/**
 * A helper function for generating DataEntity.
 * @param {object} type Type of questionnaire.
 * @param {number[][]} valueMatrix An matrix of result values.
 */
function generateDataEntity(type, valueMatrix) {
  const userInfos = []
  const results = []

  valueMatrix.forEach((arr) => {
    let result = {}
    arr.forEach((value, index) => {
      result[`Q${index + 1}`] = value
    })

    userInfos.push({})
    results.push(result)
  })

  return new DataEntity(
    type,
    userInfos,
    results
  )
}