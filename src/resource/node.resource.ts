import { NodeModelType } from "../model/node.model";

// Option 1: Using the exported type (Recommended)
export default class NodeResource {
  constructor(private model: NodeModelType) {}

  basic() {
    return {
      id: this.model._id,
      name: this.model.name,
      category: this.model.category,
      type: this.model.type
    }
  }

  detailed() {
    return {
      ...this.basic(),
      position: this.model.position,
      config: this.model.config
    }
  }
}