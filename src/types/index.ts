import { ActionType } from "./action";
import { AiType } from "./ai";
import { IntegrationType } from "./integration";
import { LogicType } from "./logic";
import { TriggerType } from "./trigger";

export type NodeType = TriggerType | ActionType | LogicType | AiType | IntegrationType;
export type Category = 'trigger' | 'action' | 'logic' | 'ai' | 'integration';
type Position = { x: number; y: number };

export interface Node<P = unknown> {
  category: Category;
  type: NodeType;
  name: string;
  position: Position;
  config: {
    params: P;
  };
}