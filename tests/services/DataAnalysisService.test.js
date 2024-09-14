import { test, expect, assert } from "vitest";
import QUESTIONNAIRE_TYPE from "../../src/constants/QuestionnaireType";
import dataAnalysisService from "../../src/services/DataAnalysisService";
import { QuestionnaireTypeError } from "../../src/exceptions/DataExceptions";
import { generateDataEntity } from "../TestUtils";


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


