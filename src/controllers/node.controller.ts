import { ObjectId } from "mongoose";
import ValidationEngine from "../engines/Validation";
import NodeRepository from "../repository/NodeRepository";
import NodeResource from "../resource/node.resource";
import { NodeRequest } from "../types/request";
import Response, { BAD_REQUEST, CREATED, OK } from "../utils/Response";
import { getWorkflowById } from "../helpers/workflow.helper";
import _ from 'lodash';

interface NodeControllerInterface {
  createNode(data: NodeRequest[]): Promise<Response | undefined>;
  fetchNodes(): Promise<Response | undefined>;
  fetchNode(id: ObjectId): Promise<Response | undefined>;
}

class NodeController implements NodeControllerInterface {
  private NodeRepository: NodeRepository;
  private Validation: ValidationEngine;

  constructor() {
    this.NodeRepository = new NodeRepository();
    this.Validation = new ValidationEngine();
  }

  async createNode(data: NodeRequest[]) {
    const WORKFLOW_ID = data[0].workflow_id;
    await getWorkflowById(WORKFLOW_ID);

    const requiredFields = ["category", "type", "config", "name", "position", "workflow_id"];

    const filteredArray = _.map(data, (obj: Record<string, unknown>) => _.pick(obj, requiredFields));
    console.log("hi spectra", filteredArray)
    if (!filteredArray.every((item: NodeRequest) => item.category && item.config && item.name && item.position && item.type && item.workflow_id)) return BAD_REQUEST("Missing required fields");


    for (const node of filteredArray) {
      // console.log(node.config.params, node.category, node.type)
      this.Validation.validate(node.config.params, node.category, node.type);
      console.log("Config.params", node.config.params);
    }

    const create = await this.NodeRepository.bulkCreate(filteredArray);
    const nodeResourceInstance = new NodeResource(create);
    const res = nodeResourceInstance.basic();
    return CREATED("Node created successfully", res);
    // Implementation for creating a node
  }

  async fetchNodes() {
    // const { category, config, name, position, type } = data;
    // this.Validation.validate({ formId: "689c7230abe375c173d0c72f", userId: "689c7230abe375c173d0c72f", data: {} }, 'trigger', 'form_submissions');
    const nodes = await this.NodeRepository.findAll();
    return OK("Nodes fetched successfully", nodes);
  }

  async fetchNode(id: ObjectId) {
    const node = await this.NodeRepository.findById(id);
    if (!node) return BAD_REQUEST("Node not found");
    return OK("Node fetched successfully", node);
  }
}

export default NodeController;
