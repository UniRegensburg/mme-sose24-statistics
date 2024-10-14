
/**
 * Common settings for diagram.
 */
const DIAGRAM_SETTING = {}

DIAGRAM_SETTING.BOOL = {
  gridX: {
    name: "gridX",
    default: false
  },
  gridY: {
    name: "gridY",
    default: true
  }
}


DIAGRAM_SETTING.SELECT = {
  colorScheme: {
    name: "colorScheme",
    items: [],
    default: ""
  }
}



/**
 * Helper function that generates plot options from common settings.
 */
function commonPlotSettings(settings) {
  return {
    y: { grid: settings.gridY },
    x: { grid: settings.gridX },
    color: { scheme: settings.colorScheme },
  }
}

Object.freeze(DIAGRAM_SETTING)

export { DIAGRAM_SETTING, commonPlotSettings }