export default class WorkspaceEntity {

  constructor(dataEntity=null, diagramEntity=null) {
    this.dataName = ""
    this.dataEntity = dataEntity
    this.diagramEntity = diagramEntity
  }

  setDataName(name) {
    this.dataName = name
  }

  setDataEntity(dataEntity) {
    this.dataEntity = dataEntity
    if (this.diagramEntity) {
      this.diagramEntity.setLinkedData(this.dataEntity)
    }
  }

  setDiagramEntity(diagramEntity) {
    this.diagramEntity = diagramEntity
  }

}