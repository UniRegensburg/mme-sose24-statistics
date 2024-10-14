import { apply, average, standardDeviation, inplaceStandardize } from "../utils/MathUtils";
import dataAnalysisService from "../services/DataAnalysisService"


/**
 * Supported functions. All functions apart from `SCORE` take in an array and
 * fill in the results inplace.
 */
const FUNCTIONS = {
  // SCORE function behaves differently. This is accounted for in function parseFactor
  SCORE: {
    name: "SCORE",
    desc: "Questionnaire score corresponding to its type.",
    func: (dataEntity) => dataAnalysisService.calculateScores(dataEntity),
  },

  SCALE: {
    name: "SCALE",
    desc: "Standardize data.",
    func: (arr) => inplaceStandardize(arr),
  },

  AVG: {
    name: "AVG",
    desc: "Average value.",
    func: (arr) => arr.fill(average(arr)),
  },

  SD:  {
    name: "SD",
    desc: "Standard deviation.",
    func: (arr) => arr.fill(standardDeviation(arr))
  },

  MAX: {
    name: "MAX",
    desc: "Maximum value.",
    func: (arr) => arr.fill(Math.max(...arr))
  },

  MIN: {
    name: "MIN",
    desc: "Minimum value.",
    func: (arr) => arr.fill(Math.min(...arr))
  },

  ABS: {
    name: "ABS",
    desc: "Absolute value.",
    func: (arr) => apply(arr, Math.abs)
  },

  FLOOR: {
    name: "FLOOR",
    desc: "Floor function.",
    func: (arr) => apply(arr, Math.floor)
  },

  LOG: {
    name: "LOG",
    desc: "logarithm with base e.",
    func: (arr) => apply(arr, Math.log)
  },

  EXP: {
    name: "EXP",
    desc: "Exponential function.",
    func: (arr) => apply(arr, Math.exp)
  },

  SIN: {
    name: "SIN",
    desc: "Sine function",
    func: (arr) => apply(arr, Math.sin)
  },

  COS: {
    name: "COS",
    desc: "Cosine function.",
    func: (arr) => apply(arr, Math.cos)
  },
}

Object.freeze(FUNCTIONS)
export default FUNCTIONS