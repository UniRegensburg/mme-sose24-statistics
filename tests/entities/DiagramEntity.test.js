import { test, assert, expect } from "vitest";
import { generateDataEntity } from "../TestUtils";
import QUESTIONNAIRE_TYPE from "../../src/constants/QuestionnaireType";
import DiagramEntity from "../../src/entities/DiagramEntity";
import DIAGRAM_TYPE from "../../src/constants/DiagramType";
import { DiagramTypeError } from "../../src/exceptions/DataExceptions";


const dataEntity = generateDataEntity(
  QUESTIONNAIRE_TYPE.NONE,
  [
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ]
)

dataEntity.addUserInfoColumns("age")

const diagramEntity = new DiagramEntity(
  DIAGRAM_TYPE.HIST,
  dataEntity,
  {
    gridY: false
  }
)


test(
  "Option getter and setter work correctly.",
  () => {
    assert(diagramEntity.getOption("gridY") === false)
    diagramEntity.setOption("x", "age")
    assert(diagramEntity.getOption("x") === "age")
    expect(() => diagramEntity.setOption("fake-option", 0))
      .toThrow(DiagramTypeError)
    expect(() => diagramEntity.setOption("x", "fake-column"))
      .toThrow(DiagramTypeError)
  }
)
