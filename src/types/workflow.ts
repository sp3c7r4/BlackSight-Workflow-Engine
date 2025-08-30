import { ObjectId } from "mongoose";
import { Node } from ".";

interface Edge {
  source: string;
  target: string;
  resolves?: boolean;
}

export interface Workflow {
  user_id: ObjectId;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}
