import { test, assert, expect } from "vitest"
import { evaluate, tokenize } from "../../src/utils/Evaluation"
import { arraysEqual, generateDataEntity } from "../TestUtils"
import QUESTIONNAIRE_TYPE from "../../src/constants/QuestionnaireType"


const dataEntity = generateDataEntity(
  QUESTIONNAIRE_TYPE.SUS,
  [
    [3,3,3,3,3,3,3,3,3,3],
    [5,5,5,5,5,5,5,5,5,5],
    [3,3,3,3,3,3,3,3,3,3],
    [5,5,5,5,5,5,5,5,5,5]
  ]
)

test(
  "Evaluation function works properly.",
  () => {
    assert(arraysEqual(evaluate("SCORE + 1", dataEntity), [51, 51, 51, 51]))
    assert(arraysEqual(evaluate("-Q1*2 +1", dataEntity), [-5, -9, -5, -9]))
    assert(arraysEqual(evaluate(".2*4", dataEntity), [.8, .8, .8, .8]))
    expect(() => evaluate("0??+Q6", dataEntity)).toThrowError()
  }
)

test(
  "Statistic functions works properly.",
  () => {
    assert(arraysEqual(evaluate("AVG(Q1)", dataEntity), [4, 4, 4, 4]))
  }
)

test(
  "DataEntity uses evaluation properly,",
  () => {
    const expr = "Q1*2+1"
    dataEntity.addTransformColumns(expr)
    assert(arraysEqual(dataEntity.transformColumns, [expr]))
    assert(arraysEqual(dataEntity.col(expr), [7, 11, 7, 11]))
  }
)