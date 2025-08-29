import NodeRepository from "../repository/NodeRepository";
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

  constructor() {
    this.NodeRepository = new NodeRepository();
  }

  async createNode(data: NodeRequest) {
    const { category, config, name, position, type } = data;
    if (!category || !config || !name || !position || !type) return BAD_REQUEST("Missing required fields");

    const create = await this.NodeRepository.create(data);
    return CREATED("Node created successfully", create);
    // Implementation for creating a node
  }

  async fetchNodes() {
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
