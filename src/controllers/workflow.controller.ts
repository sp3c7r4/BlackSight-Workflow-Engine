import ValidationEngine from "../engines/Validation";
import WorkflowRepository from "../repository/WorkflowRepository";
import { ObjectId } from "../types/Mongo";
import { WorkFlowRequest } from "../types/request";
import Response, { BAD_REQUEST, OK } from "../utils/Response";

interface WorkFlowControllerInterface {
  createWorkFlow(data: WorkFlowRequest): Promise<Response | undefined>;
  fetchWorkFlows(): Promise<Response | undefined>;
  fetchWorkFlow(id: ObjectId): Promise<Response | undefined>;
  updateWorkFlow(id: ObjectId, data: WorkFlowRequest): Promise<Response | undefined>;
  deleteWorkFlow(id: ObjectId): Promise<Response | undefined>;
}


export default class WorkFlowController implements WorkFlowControllerInterface {
  private WorkFlowRepository: WorkflowRepository;
  private Validation: ValidationEngine;

  constructor() {
    this.WorkFlowRepository = new WorkflowRepository();
    this.Validation = new ValidationEngine();
  }

  async createWorkFlow(data: WorkFlowRequest): Promise<Response | undefined> {
    const { name, description, nodes, edges } = data;
    if (!name || !description || !nodes || !edges) return BAD_REQUEST("Missing required fields");

    const create = await this.WorkFlowRepository.create({ name, description, nodes, edges });
    return OK("Workflow created successfully", create);
  }

  async fetchWorkFlows(): Promise<Response | undefined> {
    const workflows = await this.WorkFlowRepository.findAll();
    return OK("Workflows fetched successfully", workflows);
  }

  async fetchWorkFlow(id: ObjectId): Promise<Response | undefined> {
    const workflow = await this.WorkFlowRepository.findById(id);
    if (!workflow) return BAD_REQUEST("Workflow not found");
    return OK("Workflow fetched successfully", workflow);
  }

  async updateWorkFlow(id: ObjectId, data: WorkFlowRequest): Promise<Response | undefined> {
    const { name, description, nodes, edges } = data;
    if (!name || !description || !nodes || !edges) return BAD_REQUEST("Missing required fields");

    const update = await this.WorkFlowRepository.update(id, { name, description, nodes, edges });
    if (!update) return BAD_REQUEST("Workflow not found");
    return OK("Workflow updated successfully", update);
  }

  async deleteWorkFlow(id: ObjectId): Promise<Response | undefined> {
    const deleted = await this.WorkFlowRepository.delete(id);
    if (!deleted) return BAD_REQUEST("Workflow not found");
    return OK("Workflow deleted successfully", deleted);
  }

}