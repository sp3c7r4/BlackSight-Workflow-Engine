import ValidationEngine from "../engines/Validation";
import NodeRepository from "../repository/NodeRepository";
import NodeResource from "../resource/node.resource";
import { ObjectId } from "../types/Mongo";
import { NodeRequest } from "../types/request";
import Response, { BAD_REQUEST, CREATED, OK } from "../utils/Response";

interface NodeControllerInterface {
  createNode(data: NodeRequest): Promise<Response | undefined>;
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

  async createNode(data: NodeRequest) {
    const { category, config, name, position, type } = data;
    if (!category || !config || !name || !position || !type) return BAD_REQUEST("Missing required fields");
    this.Validation.validate(config.params, category, type);
    console.log("Config.params", data)

    const create = await this.NodeRepository.create({ category, config, name, position, type });
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
