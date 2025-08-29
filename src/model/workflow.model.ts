import { Schema, model } from "mongoose";
import { Workflow } from "../types/workflow";

const ObjectId = Schema.Types.ObjectId;

const WorkFlowSchema: Schema = new Schema<Workflow>({
  id: { type: ObjectId, auto: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  nodes: [
    {
      id: { type: ObjectId, ref: 'Node', auto: true },
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
    }
  ],
  edges: [
    {
      source: { type: ObjectId, ref: 'Node', required: true },
      target: { type: ObjectId, ref: 'Node', required: true },
      condition: { type: String, required: false }
    }
  ],
}, {
  timestamps: true
})

const WorkFlow = model('workflow', WorkFlowSchema)
export default WorkFlow;