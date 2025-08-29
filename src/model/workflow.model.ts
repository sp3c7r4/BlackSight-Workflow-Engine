import { Schema, model, Document } from "mongoose";
import { Workflow } from "../types/workflow";

const ObjectId = Schema.Types.ObjectId;

interface IWorkflow extends Workflow, Document {}

const WorkFlowSchema: Schema = new Schema<IWorkflow>({
  _id: { type: ObjectId },
  name: { type: String, required: true },
  description: { type: String, required: false },
  nodes: [
    {
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
      source: { type: String, required: true },
      target: { type: String, required: true },
      condition: { type: String, required: false }
    }
  ],
}, {
  timestamps: true
})

const WorkFlow = model<IWorkflow>('workflow', WorkFlowSchema)
export default WorkFlow;
export type WorkflowModel = IWorkflow;