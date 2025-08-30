import { ZodError, ZodSchema } from "zod";
import { actionSchema, aiSchema, integrationSchema, logicSchema, triggerSchema } from "../validator/schemas";
import { consoleErrorLog } from "../utils/Logger";
import { Category, NodeType } from "../types";
import { TriggerType } from "../types/trigger";
import { CE_BAD_REQUEST } from "../utils/Error";
import { IntegrationType } from "../types/integration";
import { ActionType } from "../types/action";
import { AiType } from "../types/ai";
import { LogicType } from "../types/logic";

export default class ValidationEngine {
  private actionSchema = actionSchema;
  private actionType: Record<ActionType, ZodSchema<unknown>> = {
    send_email: this.actionSchema.sendEmailSchema,
    send_sms: this.actionSchema.sendSmsSchema,
    update_crm_record: this.actionSchema.updateCrmRecordSchema,
    assign_tag: this.actionSchema.assignTagSchema,
    notify_admin: this.actionSchema.notifyAdminSchema,
    send_to_webhook: this.actionSchema.sendToWebhookSchema,
  };

  private aiSchema = aiSchema;
  private aiType: Record<AiType, ZodSchema<unknown>> = {
    ai_intent_detection: this.aiSchema.aiIntentDetectionSchema,
    ai_summarizer: this.aiSchema.aiSummarizerSchema,
    analyze_sentiment: this.aiSchema.analyzeSentimentSchema,
    text_generation: this.aiSchema.textGenerationSchema,
  };

  private triggerSchema = triggerSchema;
  private triggerType: Record<TriggerType, ZodSchema<unknown>> = { 
    form_submission: this.triggerSchema.formSubmissionSchema,
    user_signup: this.triggerSchema.userSignupSchema,
    bot_conversation_start: this.triggerSchema.botConversationStartSchema,
    webhook_received: this.triggerSchema.webhookReceivedSchema,
    time_based_trigger: this.triggerSchema.timeBasedTriggerSchema,
  };

  private integrationSchema = integrationSchema;
  private integrationType: Record<IntegrationType, ZodSchema<unknown>> = {
    google_calender: this.integrationSchema.googleCalenderSchema,
    google_sheet: this.integrationSchema.googleSheetSchema,
    stripe: this.integrationSchema.stripeSchema,
    zapier: this.integrationSchema.zapierSchema,
    airtable: this.integrationSchema.airtableSchema,
    sendgrid: this.integrationSchema.sendGridSchema,
    whatsapp: this.integrationSchema.whatsappSchema,
    slack: this.integrationSchema.slackSchema,
    telegram: this.integrationSchema.telegramSchema,
    messanger: this.integrationSchema.messangerSchema,
    google_voe_3: this.integrationSchema.googleVoE3Schema,
  };

  private logicSchema = logicSchema;
  private logicType: Record<LogicType, ZodSchema<unknown>> = {
    check_field: this.logicSchema.checkFieldSchema,
    compare_tags: this.logicSchema.compareTagsSchema,
    if_else: this.logicSchema.ifElseSchema,
    wait_delay_timer: this.logicSchema.waitDelaySchema,
  };

  handleNoSchema(CATEGORY: Category, TYPE: NodeType) {
    consoleErrorLog(`No schema found for ${TYPE} in ${CATEGORY}`);
    throw CE_BAD_REQUEST(`No schema found for ${TYPE} in ${CATEGORY}`);
  }

  private fetchSchema(type: NodeType, category: Category) {
    const TYPE = type;
    const CATEGORY = category;

    switch (CATEGORY) {
      case 'trigger': {
        const triggerSchema = this.triggerType[TYPE];
        if (!triggerSchema) this.handleNoSchema(CATEGORY, TYPE);
        return triggerSchema;
      }
      case 'action': {
        const actionSchema = this.actionType[TYPE];
        if (!actionSchema) this.handleNoSchema(CATEGORY, TYPE);
        return actionSchema;
      }
      case 'logic': {
        const logicSchema = this.logicType[TYPE];
        if (!logicSchema) this.handleNoSchema(CATEGORY, TYPE);
        return logicSchema;
      }
      case 'ai': {
        const aiSchema = this.aiType[TYPE];
        if (!aiSchema) this.handleNoSchema(CATEGORY, TYPE);
        return aiSchema;
      }
      case 'integration': {
        const integrationSchema = this.integrationType[TYPE];
        if (!integrationSchema) this.handleNoSchema(CATEGORY, TYPE);
        return integrationSchema;
      }
      default:
        consoleErrorLog(`Unknown type: ${TYPE}`)
        throw CE_BAD_REQUEST(`Unknown type: ${TYPE}`)
    }
  }

  validate(body: unknown, category: Category, type: NodeType ) {
    try {
      // console.log(body)
      const schema = this.fetchSchema(type, category);
      return schema.parse(body);
    } catch(e) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));
        console.log(errorMessages)

        throw CE_BAD_REQUEST('Validation failed', errorMessages);
      }

      consoleErrorLog(`Validation failed for ${type} in ${category}: ${e}`);
      throw CE_BAD_REQUEST(e);
    }
  }
}

// console.log(new Validation().fetchSchema('trigger', 'form_submission'));