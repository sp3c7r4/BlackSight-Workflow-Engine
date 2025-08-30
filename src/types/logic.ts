import { Node } from ".";

export type LogicType = "if_else" | "check_field" | "compare_tags" | "wait_delay_timer";

export type LogicParams = IfElse | CheckField | CompareTags | WaitDelayTimer;

type IfElse = {
  condition: string;
};

type CheckField = {
  field: string;
  value: string;
};

type CompareTags = {
  tag1: string;
  tag2: string;
};

type WaitDelayTimer = {
  duration: number;
};

type LogicParamsMap = {
  if_else: IfElse;
  check_field: CheckField;
  compare_tags: CompareTags;
  wait_delay_timer: WaitDelayTimer;
};

export interface LogicNode<C extends LogicType> extends Node<LogicParamsMap[C]> {
  type: C;
  category: "logic";
}