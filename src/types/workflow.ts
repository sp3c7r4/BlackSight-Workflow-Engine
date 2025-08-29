import { Schema } from "mongoose";
import { Node } from ".";

type ObjectId = Schema.Types.ObjectId

interface Edge {
  source: string;
  target: string;
  condition?: string;
}

export interface Workflow {
  id: ObjectId;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}
