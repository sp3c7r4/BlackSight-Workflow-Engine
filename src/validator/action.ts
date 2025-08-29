import z from "zod";

export const createActionNodeSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.literal("action"),
  category: z.enum(["send_email", "send_sms", "assign_tag", "update_crm_record", "send_to_webhook", "notify_admin"]),
  data: z.object({
    params: z.object({}).passthrough()
  }),
});

export const sendEmailSchema = z.object({
  from: z.string().email(),
  to: z.string().email(),
  cc: z.string().email().optional(),
  bcc: z.string().email().optional(),
  subject: z.string().min(2).max(100),
  body: z.string().min(5).max(500),
  reply_to: z.string().email().optional(),
});

export const sendSmsSchema = z.object({
  to: z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'invalid PhoneNumber'),
  subject: z.string().min(2).max(100),
  body: z.string().min(5).max(500),
  reply_to: z.string().email().optional(),
});

export const assignTagSchema = z.object({
  // user_id: z.string().uuid(),
  tag: z.string().min(2).max(100),
});

export const updateCrmRecordSchema = z.object({
  recordId: z.string().uuid(),
  // data: z.record(z.string(), z.any()),
});

export const sendToWebhookSchema = z.object({
  url: z.string().url(),
  // payload: z.record(z.string(), z.any()),
});

export const notifyAdminSchema = z.object({
  message: z.string().min(5).max(500),
});