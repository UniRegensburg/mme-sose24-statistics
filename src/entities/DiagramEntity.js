import DataEntity from "./DataEntity";

export default class DiagramEntity {

  /**
   * @param {object} type
   * @param {DataEntity} dataEntity
   */
  constructor(type, dataEntity, config={}) {
    this.type = type
    this.linkedData = dataEntity
    this.config = config
  }



}