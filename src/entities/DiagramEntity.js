import { DIAGRAM_SETTING } from "../constants/DiagramSetting";
import DIAGRAM_TYPE from "../constants/DiagramType";
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
    this.options = {}
    this.settings = {}
    this._setDefaultSettings()
    Object.keys(options).forEach(key => {
      this.setOption(key, options[key])
    })
  }
  
  /**
   * A helper function to set default options. Must not be used from outside of the class.
   */
  _setDefaultSettings() {
    Object.values(DIAGRAM_SETTING.BOOL).forEach(setting => {
      this.setSetting(setting.name, setting.default)
    })
    Object.values(DIAGRAM_SETTING.SELECT).forEach(setting => {
      this.setSetting(setting.name, setting.default)
    })
  }

  setSetting(key, value) {
    if (value === null || value === undefined) {
      delete this.options[key]
      return
    }
    this.settings[key] = value
  }
  
  
  /**
   * Set options to configure diagram resulf. Possible options can be found in `DiagramType.js` or using
   * the getter `supportedOptions`.
   * @param {string} key 
   * @param {any} value 
   * @returns 
   */
  setOption(key, value) {
    if (value === null || value === undefined) {
      delete this.options[key]
      return
    }
    if (!this.type.options.includes(key)) {
      throw new DiagramTypeError(`"${key}" is not a valid option for ${this.type.name} diagram.
        Valid options are ${this.type.options}.`)
    }
    if (key === "x") {
      if (!this.linkedData.allColumns.includes(value)) {
        throw new DiagramTypeError(`DataEntity ${this.linkedData} does not contain column ${value}`)
      }
    }
    else if (key === "y") {
      if (!this.linkedData.allColumns.includes(value)) {
        throw new DiagramTypeError(`DataEntity ${this.linkedData} does not contain column "${value}"`)
      }
    }
    this.options[key] = value
  }

  /**
   * Link DiagramEntity to another DataEntity. Reset `x` and `y` options.
   * @param {DataEntity} dataEntity 
   */
  setLinkedData(dataEntity) {
    this.linkedData = dataEntity
    delete this.options.x
    delete this.options.y
  }

  /**
   * Set diagram type. Delete all unsupported options.
   * @param {object} type 
   */
  setType(type) {
    this.type = type
    Object.keys(this.options).forEach(k => {
      if (!(k in type.options)) { delete this.options[k] }
    })
  }

  
  /**
   * Generates a configuration object that can be used by the function `Plot.plot`. This function
   * must not be used from outside of `src/conponents/Diagram.jsx`.
   * @returns {object}
  */
  generatePlotOptions() {
    this.checkPlotability()
    return this.type.plotOptions(this.linkedData.data, this.settings, this.options)
  }
  
  /**
   * Checks if the diagram entity is ready for plotting.
   * All required options of the diagram type must be filled.
   * @returns 
  */
  checkPlotability() {
    if (this.type === DIAGRAM_TYPE.NONE) {
      throw new DiagramTypeError("NONE-type diagram cannot be plotted.")
    }
    for (let i = 0; i < this.type.requiredOptions.length; i++) {
      let requiredOption = this.type.requiredOptions[i]
      if (!(requiredOption in this.options)) { 
        throw new DiagramTypeError(`All required options must be filled. 
            Required options are ${this.requiredOptions}`)
      }
    }
    return true
  }

  
  get allOptions() { return this.type.options }
  
  get requiredOptions() { return this.type.requiredOptions }
  
  getOption(key) { return this.options[key] }

  getSetting(key) { return this.settings[key]}

}