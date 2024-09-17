import { test, expect, assert } from "vitest"
import DataEntity from "../../src/entities/DataEntity"
import QUESTIONNAIRE_TYPE from "../../src/constants/QuestionnaireType"
import { InvalidDataInputError, QuestionnaireTypeError } from "../../src/exceptions/DataExceptions"
import { arraysEqual } from "../TestUtils"


const noneData = new DataEntity()
const susData = new DataEntity(QUESTIONNAIRE_TYPE.SUS)

test(
  "New questions can be added to NONE-type DataEntity",
  () => {
    noneData.addQuestions()
    assert(arraysEqual(noneData.questionColumns, ["Q1"]))
    noneData.addQuestions(2)
    assert(arraysEqual(noneData.questionColumns, ["Q1", "Q2", "Q3"]))
  }
)

test(
  "New user info columns can be added to DataEntity.",
  () => {
    noneData.addUserInfoColumns("id")
    assert(arraysEqual(noneData.userInfoColumns, ["id"]))
    noneData.addUserInfoColumns(["id", "age", "gender"])
    assert(arraysEqual(noneData.userInfoColumns, ["id", "age", "gender"]))
  }
)

test(
  "New rows can be added to DataEntity.",
  () => {
    assert(noneData.size === 0)
    noneData.addEmptyRows(2)
    assert(noneData.size === 2)
  }
)

test(
  "Getter and setter working correctly.",
  () => {
    noneData.setValue(0, "Q1", 5)
    noneData.setValue(0, "age", 50)
    assert(noneData.loc(0, "Q1") === 5)
    assert(noneData.loc(0, "age") === 50)
    expect(() => noneData.setValue(0, "Q100", 1))
      .toThrow(InvalidDataInputError)
    expect(() => noneData.setValue(0, "Age", 1))
      .toThrow(InvalidDataInputError)
  }
)

test(
  "Fill empty locations with `null` when new columns are added.",
  () => {
    noneData.addQuestions()
    assert(noneData.loc(0, "Q4") === null)
    assert(noneData.loc(1, "Q4") === null)

    noneData.addUserInfoColumns("education")
    assert(noneData.loc(0, "education") === null)
    assert(noneData.loc(1, "education") === null)
  }
)

test(
  "Cannot add questions to non-NONE-type DataEntity.",
  () => {
    expect(() => susData.addQuestions())
      .toThrow(QuestionnaireTypeError)
  }
)

test(
  "DataEntity throws exception when setting result values is outside of value range.",
  () => {
    expect(() => susData.setResultValue(0, 0, 6))
    .toThrow(InvalidDataInputError)
    expect(() => susData.setResultValue(0, 0, 0))
    .toThrow(InvalidDataInputError)
  }
)

test(
  "DataEntity throws exception when question number is outside of range.",
  () => {
    expect(() => noneData.setResultValue(0, 10000, 5))
    .toThrow(InvalidDataInputError)
    expect(() => susData.setResultValue(0, 0, 5))
    .toThrow(InvalidDataInputError)
    expect(() => susData.setResultValue(0, 11, 5))
      .toThrow(InvalidDataInputError)
    expect(() => susData.setResultValue(0, 0, 5))
      .toThrow(InvalidDataInputError)
  }
)