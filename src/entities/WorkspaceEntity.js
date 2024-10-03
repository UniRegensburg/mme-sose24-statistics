export default class WorkspaceEntity {

  constructor(dataEntity=null, diagramEntity=null) {
    this.dataEntity = dataEntity
    this.diagramEntity = diagramEntity
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