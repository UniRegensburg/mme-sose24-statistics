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
    expect(() => dataAnalysisService.calculateTotalScore(testDataEntity))
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
    const susScore = dataAnalysisService.calculateTotalScore(testDataEntity)
    assert(susScore === 50, "Test SUS data should have SUS score 50.")
  }
)

test(
  "DataAnalysisService calculates NPS correctly.",
  () => {
    const testDataEntity = generateDataEntity(
      QUESTIONNAIRE_TYPE.NPS,
      [[1],[8],[8],[7],[9],[9],[9],[9]]
    )
    const npsScore = dataAnalysisService.calculateTotalScore(testDataEntity)
    assert(Math.abs(npsScore - 37.5) < 0.1, "Test NPS data should have NPS score 37.5.")
  }
)


