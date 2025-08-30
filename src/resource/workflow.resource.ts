import { WorkflowModel } from "../model/workflow.model";

export default class WorkflowResource {
  constructor(private model: WorkflowModel) {}

  basic() {
    return {
      id: this.model._id,
      name: this.model.name,
      description: this.model.description
    }
  }

  detailed() {
    return {
      ...this.basic(),
      nodes: this.model.nodes,
      edges: this.model.edges
    }
  }
}