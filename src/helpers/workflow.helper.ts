import { ObjectId } from "mongoose";
import WorkflowRepository from "../repository/WorkflowRepository";
import { CE_BAD_REQUEST } from "../utils/Error";

const workflowRepositoryInstance = new WorkflowRepository()

export const workflowExistsByUserId = async (id: ObjectId): Promise<boolean> => {
  const workflow = await workflowRepositoryInstance.findByUserId(id)
  console.log(workflow)
  if(workflow) throw CE_BAD_REQUEST('Workflow already exists for this user');
  return;
};
