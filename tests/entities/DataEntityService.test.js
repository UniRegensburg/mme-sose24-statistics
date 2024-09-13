import { test, expect } from "vitest"
import { DataEntity } from "../../src/entities/DataEntity"
import QUESTIONNAIRE_TYPE from "../../src/constants/QuestionnaireType"
import { InvalidDataInputError } from "../../src/exceptions/DataExceptions"


const susDataEntity = new DataEntity(QUESTIONNAIRE_TYPE.SUS)
susDataEntity.insertEmptyRow(0)

test(
  "DataEntity throws exception when setting result values is outside of value range.",
  () => {
    expect(() => susDataEntity.setResultValue(0, 0, 6))
      .toThrow(InvalidDataInputError)
    expect(() => susDataEntity.setResultValue(0, 0, 0))
      .toThrow(InvalidDataInputError)
  }
)

test(
  "DataEntity throws exception when question number is outside of range.",
  () => {
    expect(() => susDataEntity.setResultValue(0, 10, 5))
      .toThrow(InvalidDataInputError)
  }
)