import { ZodError, ZodSchema } from "zod";
import { actionSchema, aiSchema, integrationSchema, logicSchema, triggerSchema } from "../validator/schemas";
import { consoleErrorLog } from "../utils/Logger";
import { Category, NodeType } from "../types";
import { TriggerCategory } from "../types/trigger";
import { CE_BAD_REQUEST } from "../utils/Error";
import { IntegrationCategory } from "../types/integration";
import { ActionCategory } from "../types/action";
import { AiCategory } from "../types/ai";
import { LogicCategory } from "../types/logic";

export default class ValidationEngine {
  private actionSchema = actionSchema;
  private actionCategory: Record<ActionCategory, ZodSchema<unknown>> = {
    send_email: this.actionSchema.sendEmailSchema,
    send_sms: this.actionSchema.sendSmsSchema,
    update_crm_record: this.actionSchema.updateCrmRecordSchema,
    assign_tag: this.actionSchema.assignTagSchema,
    notify_admin: this.actionSchema.notifyAdminSchema,
    send_to_webhook: this.actionSchema.sendToWebhookSchema,
  };

  private aiSchema = aiSchema;
  private aiCategory: Record<AiCategory, ZodSchema<unknown>> = {
    ai_intent_detection: this.aiSchema.aiIntentDetectionSchema,
    ai_summarizer: this.aiSchema.aiSummarizerSchema,
    analyze_sentiment: this.aiSchema.analyzeSentimentSchema,
    text_generation: this.aiSchema.textGenerationSchema,
  };

  private triggerSchema = triggerSchema;
  private triggerCategory: Record<TriggerCategory, ZodSchema<unknown>> = { 
    form_submission: this.triggerSchema.formSubmissionSchema,
    user_signup: this.triggerSchema.userSignupSchema,
    bot_conversation_start: this.triggerSchema.botConversationStartSchema,
    webhook_received: this.triggerSchema.webhookReceivedSchema,
    time_based_trigger: this.triggerSchema.timeBasedTriggerSchema,
  };

  private integrationSchema = integrationSchema;
  private integrationCategory: Record<IntegrationCategory, ZodSchema<unknown>> = {
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
  private logicCategory: Record<LogicCategory, ZodSchema<unknown>> = {
    check_field: this.logicSchema.checkFieldSchema,
    compare_tags: this.logicSchema.compareTagsSchema,
    if_else: this.logicSchema.ifElseSchema,
    wait_delay_timer: this.logicSchema.waitDelaySchema,
  };

  handleNoSchema(TYPE: NodeType, CATEGORY: Category) {
    consoleErrorLog(`No schema found for ${TYPE} - ${CATEGORY}`);
    throw CE_BAD_REQUEST(`No schema found for ${TYPE} - ${CATEGORY}`);
  }

  fetchSchema(type: NodeType, category: Category) {
    const TYPE = type;
    const CATEGORY = category;

    switch (TYPE) {
      case 'trigger': {
        const triggerSchema = this.triggerCategory[CATEGORY];
        if (!triggerSchema) this.handleNoSchema(TYPE, CATEGORY);
        return triggerSchema;
      }
      case 'action': {
        const actionSchema = this.actionCategory[CATEGORY];
        if (!actionSchema) this.handleNoSchema(TYPE, CATEGORY);
        return actionSchema;
      }
      case 'logic': {
        const logicSchema = this.logicCategory[CATEGORY];
        if (!logicSchema) this.handleNoSchema(TYPE, CATEGORY);
        return logicSchema;
      }
      case 'ai': {
        const aiSchema = this.aiCategory[CATEGORY];
        if (!aiSchema) this.handleNoSchema(TYPE, CATEGORY);
        return aiSchema;
      }
      case 'integration': {
        const integrationSchema = this.integrationCategory[CATEGORY];
        if (!integrationSchema) this.handleNoSchema(TYPE, CATEGORY);
        return integrationSchema;
      }
      default:
        consoleErrorLog(`Unknown type: ${TYPE}`)
        throw CE_BAD_REQUEST(`Unknown type: ${TYPE}`)
    }
  }

  validate(body: unknown, type: NodeType, category: Category) {
    try {
      const schema = this.fetchSchema(type, category);
      return schema.parse(body);
    } catch(e) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        throw CE_BAD_REQUEST('Validation failed', errorMessages);
      }

      consoleErrorLog(`Validation failed for ${type} - ${category}: ${e}`);
      throw CE_BAD_REQUEST(`Validation failed for ${type} - ${category}: ${e}`);
    }
  }
}

// console.log(new Validation().fetchSchema('trigger', 'form_submission'));