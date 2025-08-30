import { NodeModelType } from "../model/node.model";

// Option 1: Using the exported type (Recommended)
export default class NodeResource {
  constructor(private model: NodeModelType | NodeModelType[]) {}

  basic() {
    return this.model instanceof Array ? this.model.map(item => ({
      id: item._id,
      name: item.name,
      category: item.category,
      type: item.type
    })) : {
      id: this.model._id,
      name: this.model.name,
      category: this.model.category,
      type: this.model.type
    }
  }

  detailed() {
    return this.model instanceof Array ? this.model.map(item => ({
      ...this.basic(),
      position: item.position,
      config: item.config
    })) : {
      ...this.basic(),
      position: this.model.position,
      config: this.model.config
    }
  }
}