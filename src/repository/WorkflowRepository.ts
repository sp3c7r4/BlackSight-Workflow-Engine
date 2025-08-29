import Workflow, { WorkflowModel } from "../model/workflow.model";
import BaseRepository from "./BaseRepository";

class WorkflowRepository extends BaseRepository<WorkflowModel> {
  constructor() {
    super(Workflow, 'Workflow');
  }
}

export default WorkflowRepository;
