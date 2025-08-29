import { Schema, model } from "mongoose";

const WorkFlowSchema = new Schema({
  id: {
    
  },
  me: {
    
  }
})

const WorkFlow = model('workflow', WorkFlowSchema)
export default WorkFlow;