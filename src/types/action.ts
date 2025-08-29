import { Node } from ".";

export type ActionCategory = "send_email" | "send_sms" | "assign_tag" | "update_crm_record" | "send_to_webhook" | "notify_admin";
export type ActionParams = send_email | send_sms | assign_tag | update_crm_record | send_to_webhook | notify_admin;

type send_email = {
    from: string;
    to: string;
    cc: string;
    bcc: string;
    subject: string;
    body: string;
    reply_to: string;
  }

type send_sms = {
    to: string;
    subject: string;
    body: string;
    reply_to: string;
  };

type assign_tag = {
    tag: string;
  };
type update_crm_record = {
    recordId: string;
    // data: Record<string, any>;
  };
type send_to_webhook = {
    url: string;
    // payload: Record<string, any>;
  };
  
type notify_admin = {
    message: string;
  }

type ActionParamsMap = {
  send_email: send_email;
  send_sms: send_sms;
  assign_tag: assign_tag;
  update_crm_record: update_crm_record;
  send_to_webhook: send_to_webhook;
  notify_admin: notify_admin;
};

export interface ActionNode<C extends ActionCategory> extends Node<ActionParamsMap[C]> {
  type: "action";
  category: C;
}

// const me: ActionNode<"assign_tag"> = {
//   config: {
//     params: {
//       tag: ""
//     }
//   }
// }

// const me: ActionNode<"send_email"> = {
//   config: {
//     params: {
//       from: "example@example.com",
//       to: "recipient@example.com",
//       cc: "cc@example.com",
//       bcc: "bcc@example.com",
//       subject: "Hello",
//       body: "This is a test email.",
//       reply_to: "reply@example.com"
//     }
//   }
// }