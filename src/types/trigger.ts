import { Node } from ".";

export type TriggerCategory = "form_submission" | "user_signup" | "bot_conversation_start" | "webhook_received" | "time_based_trigger";

type form_submission = {
    formId: string;
    userId: string;
    data: Record<string, unknown>;
};

type user_signup = {
    userId: string;
    email: string;
    name: string;
};

type bot_conversation_start = {
    userId: string;
    botId: string;
};

type webhook_recieved = {
    url: string;
    method: "POST" | "GET";
    headers: Record<string, string>;
    body: Record<string, unknown>;
};

type time_based_trigger = {
    cronExpression: string;
};

type TriggerParamsMap = {
    form_submission: form_submission;
    user_signup: user_signup;
    bot_conversation_start: bot_conversation_start;
    webhook_received: webhook_recieved;
    time_based_trigger: time_based_trigger;
};

export interface TriggerNode<C extends TriggerCategory> extends Node<TriggerParamsMap[C]> {
  type: "trigger";
  category: C;
}