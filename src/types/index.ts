import { ActionCategory } from "./action";
import { AiCategory } from "./ai";
import { IntegrationCategory } from "./integration";
import { LogicCategory } from "./logic";
import { TriggerCategory } from "./trigger";

export type Category = TriggerCategory | ActionCategory | LogicCategory | AiCategory | IntegrationCategory;
export type NodeType = 'trigger' | 'action' | 'logic' | 'ai' | 'integration';
type Position = { x: number; y: number };
export interface Node<P = unknown> {
  name: string;
  type: NodeType;
  category: Category;
  position: Position;
  config: {
    params: P;
  };
}