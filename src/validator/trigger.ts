import z from "zod";

export const createTriggerNodeSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.literal("trigger"),
  category: z.enum(["form_submission", "user_signup", "bot_conversation_start", "webhook_recieved", "time_based_trigger"]),
  data: z.object({
    params: z.object({}).passthrough()
  }),
});

export const formSubmissionSchema = z.object({
  formId: z.string().uuid(),
  userId: z.string().uuid(),
  data: z.record(z.string(), z.any()),
});

export const userSignupSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
});

export const botConversationStartSchema = z.object({
  userId: z.string().uuid(),
  botId: z.string().uuid(),
});

export const webhookReceivedSchema = z.object({
  url: z.string().url(),
  method: z.enum(["POST", "GET"]),
  headers: z.record(z.string(), z.string()),
  body: z.record(z.string(), z.any()),
});

export const timeBasedTriggerSchema = z.object({
  cronExpression: z.string().min(5).max(100),
});