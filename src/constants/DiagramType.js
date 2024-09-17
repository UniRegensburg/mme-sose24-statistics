

const DIAGRAM_TYPE = {}

DIAGRAM_TYPE.HIST = {
  name: "Histogram",
  requiredConfig: ["x", "xmin", "xmax", "ymin", "ymax", "bin"],
  optionalConfig: []
}


DIAGRAM_TYPE.SCATTER = {
  name: "Scatter",
  requiredConfig: ["x", "y", "xmin", "xmax", "ymin", "ymax"],
  optionalConfig: []
}



Object.freeze(DIAGRAM_TYPE)

export default DIAGRAM_TYPE