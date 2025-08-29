import { Node } from ".";

interface Edge {
  source: string;
  target: string;
  condition?: string;
}

export interface Workflow {
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}
