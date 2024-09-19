import { DiagramTypeError } from "../exceptions/DataExceptions";
import DataEntity from "./DataEntity";

export default class DiagramEntity {

  /**
   * @param {object} type Type of diagram. Must be one of the types in `DIAGRAM_TYPE`.
   * @param {DataEntity} linkedData The DataEntity whose data is used for the diagram.
   * @param {object} options Configuration for the plotting result.
   */
  constructor(type, linkedData, options={}) {
    this.type = type
    this.linkedData = linkedData
    this.options = options
    this._setDefaultOptions()
  }

  _setDefaultOptions() {
    this.options.gridY = true
    this.options.colorScheme = "burd"
  }

  setOption(key, value) {
    if (value === null || value === undefined) {
      delete this.options[key]
      return
    }
    if (this.type.options.includes(key)) {
      this.options[key] = value
      return
    }
    throw new DiagramTypeError(`"${key}" is not a valid option for ${this.type.name} diagram.
      Valid options are ${this.type.options}`)
  }

  getOption(key) {
    return this.options[key]
  }

  /**
   * Generates a configuration object that can be used by the function `Plot.plot`.
   * @returns {object}
   */
  generatePlotOptions() {
    return this.type.plotOptions(this.linkedData.data, this.options)
  }

  isPlotable() {
    for (let i = 0; i < this.type.requiredOptions.length; i++) {
      if (!(this.type.requiredOptions[i] in this.options)) { return false }
    }
    return true
  }

}