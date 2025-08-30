import { ObjectId } from "mongoose";
import WorkflowRepository from "../repository/WorkflowRepository";
import { CE_BAD_REQUEST } from "../utils/Error";
import { WorkflowModel } from "../model/workflow.model";

const workflowRepositoryInstance = new WorkflowRepository()

export const workflowExistsByUserId = async (id: ObjectId): Promise<boolean> => {
  const workflow = await workflowRepositoryInstance.findByUserId(id)
  console.log(workflow)
  if(workflow) throw CE_BAD_REQUEST('Workflow already exists for this user');
  return;
};

export const getWorkflowById = async(id: ObjectId): Promise<WorkflowModel | null> => {
  const workflow = await workflowRepositoryInstance.findById(id);
  console.log("Workflow:",workflow);
  if (!workflow) throw CE_BAD_REQUEST(`Workflow with id ${id} not found`);
  return workflow;
};