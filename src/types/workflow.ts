import { ObjectId } from "mongoose";
import { Node } from ".";

interface Edge {
  source: string;
  target: string;
  condition?: string;
}

export interface Workflow {
  user_id: ObjectId;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}
