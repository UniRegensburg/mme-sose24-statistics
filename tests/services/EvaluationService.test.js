import { test, assert, expect } from "vitest"
import { evaluate, tokenize } from "../../src/services/EvaluationService"
import { arraysEqual, generateDataEntity } from "../TestUtils"
import QUESTIONNAIRE_TYPE from "../../src/constants/QuestionnaireType"



test(
  "Evaluation function works properly.",
  () => {
    const dataEntity = generateDataEntity(
      QUESTIONNAIRE_TYPE.SUS,
      [
        [3,3,3,3,3,3,3,3,3,3],
        [5,5,5,5,5,5,5,5,5,5],
        [3,3,3,3,3,3,3,3,3,3],
      ]
    )
    assert(arraysEqual(evaluate("SCORE + 1", dataEntity), [51, 51, 51]))
    assert(arraysEqual(evaluate("-Q1*2 +1", dataEntity), [-5, -9, -5]))
    assert(arraysEqual(evaluate(".2*4+Q3", dataEntity), [3.8, 5.8, 3.8]))
    expect(() => evaluate("0??+Q6")).toThrowError()
  }
)
