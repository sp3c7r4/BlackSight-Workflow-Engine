import NodeModel, { NodeModelType } from "../model/node.model";
import BaseRepository from "./BaseRepository";

class NodeRepository extends BaseRepository<NodeModelType> {
  constructor() {
    super(NodeModel, 'Node');
  }
}

export default NodeRepository;
