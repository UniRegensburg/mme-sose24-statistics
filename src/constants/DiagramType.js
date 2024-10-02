import * as Plot from "@observablehq/plot"



/**
 * Options shared by all diagram types.
 */
const COMMON_OPTIONS = [
  "gridX",
  "gridY",
  "colorScheme"
]

/**
 * Helper function that generates plot options from common options.
 */
function commonPlotOptions(options) {
  return {
    y: { grid: options.gridY },
    color: { scheme: options.colorScheme },
  }
}



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
  options: ["x"].concat(COMMON_OPTIONS),
  requiredOptions: ["x"],
  plotOptions: (data, options) => {
    const plotOptions = commonPlotOptions(options)
    plotOptions.marks = [
      Plot.ruleY([0]),
      Plot.rectY(data, Plot.binX({y: "count"}, {x: options.x}))
    ]
    return plotOptions
  }
}


DIAGRAM_TYPE.SCATTER = {
  name: "Scatter",
  options: ["x", "y"].concat(COMMON_OPTIONS),
  requiredOptions: ["x", "y"],
  plotOptions: (data, options) => {
    const plotOptions = commonPlotOptions(options)
    plotOptions.marks = [
        Plot.ruleY([0]),
        Plot.dot(data, {x: options.x, y: options.y})
      ]
    return plotOptions
  },
}






Object.freeze(DIAGRAM_TYPE)

export default DIAGRAM_TYPE