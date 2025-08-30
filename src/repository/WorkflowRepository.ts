import { ObjectId } from "mongoose";
import Workflow, { WorkflowModel } from "../model/workflow.model";
import BaseRepository from "./BaseRepository";

class WorkflowRepository extends BaseRepository<WorkflowModel> {
  constructor() {
    super(Workflow, 'Workflow');
  }

  async findByUserId(userId: ObjectId) {
    return await this.model.findOne({ user_id: userId });
  }
}

export default WorkflowRepository;
