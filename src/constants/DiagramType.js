import * as Plot from "@observablehq/plot"
import * as d3 from "d3"
import { commonPlotSettings } from "./DiagramSetting"



/**
 * Contains necessary information of all available diagram types.
 * The following types are currently available:
 * @param {object} HIST Histogram.
 * @param {object} SCATTER Scatter plot.
 * 
 * Each type must contain the following information:
 * @param {string} name Name of the type.
 * @param {object} options All possible configuration options. 
 * @param {object} requiredOptions Options that must not be left blank.
 * @param {function} plotOptions A function that generate option objects used for funcion `Plot.plot`.
 */
const DIAGRAM_TYPE = {}


DIAGRAM_TYPE.NONE = {
  name: "None",
  options: [],
  requiredOptions: [],
}


DIAGRAM_TYPE.HIST = {
  name: "Histogram",
  options: ["x"],
  requiredOptions: ["x"],
  plotOptions: (data, settings, options) => {
    const plotOptions = commonPlotSettings(settings)
    plotOptions.marks = [
      Plot.ruleY([0]),
      Plot.rectY(data, Plot.binX({y: "count"}, {x: options.x}))
    ]
    return plotOptions
  }
}


DIAGRAM_TYPE.SCATTER = {
  name: "Scatter",
  options: ["x", "y"],
  requiredOptions: ["x", "y"],
  plotOptions: (data, settings, options) => {
    const plotOptions = commonPlotSettings(settings)
    plotOptions.marks = [
      Plot.ruleY([0]),
      Plot.dot(data, {x: options.x, y: options.y, fill: options.y})
    ]
    return plotOptions
  },
}






Object.freeze(DIAGRAM_TYPE)

export default DIAGRAM_TYPE