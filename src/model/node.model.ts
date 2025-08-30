import { model, Schema, Document } from 'mongoose'
import { Node } from '../types'

interface INode extends Node, Document {}

export const NodeSchema = new Schema<INode>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  config: {
    params: { type: Object, required: true }
  }
})

const NodeModel = model<INode>('node', NodeSchema)
export default NodeModel
export type NodeModelType = INode;