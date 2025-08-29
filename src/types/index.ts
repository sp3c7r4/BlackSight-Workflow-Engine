import { ActionCategory } from "./action";
import { AiCategory } from "./ai";
import { IntegrationCategory } from "./integration";
import { LogicCategory } from "./logic";
import { TriggerCategory } from "./trigger";

type Category = TriggerCategory | ActionCategory | LogicCategory | AiCategory | IntegrationCategory;
type Type = 'trigger' | 'action' | 'logic' | 'ai' | 'integration';
type Position = { x: number; y: number };



export interface Node<P = any> {
  id: string;
  name: string;
  type: Type;
  category: Category;
  position: Position;
  config: {
    params: P;
  };
}