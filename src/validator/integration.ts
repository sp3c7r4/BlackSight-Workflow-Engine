import z from "zod";

export const createIntegrationNodeSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.literal("integration"),
  category: z.enum(["google_sheet", "stripe", "zapier", "airtable", "sendgrid", "whatsapp", "google_calender", "slack", "telegram", "messanger", "google_voe_3"]),
  data: z.object({
    params: z.object({}).passthrough()
  }),
})

export const googleSheetSchema = z.object({
  spreadsheetId: z.string(),
  range: z.string(),
  values: z.array(z.array(z.unknown()))
});

export const stripeSchema = z.object({
  apiKey: z.string(),
  amount: z.number().min(0),
  currency: z.string().length(3),
  description: z.string().max(500)
});

export const zapierSchema = z.object({
  webhookUrl: z.string().url(),
  data: z.record(z.unknown())
});

export const airtableSchema = z.object({
  baseId: z.string(),
  tableName: z.string(),
  recordId: z.string(),
  fields: z.record(z.unknown())
});

export const sendGridSchema = z.object({
  apiKey: z.string(),
  to: z.string().email(),
  from: z.string().email(),
  subject: z.string().max(100),
  body: z.string().max(1000)
});

export const whatsappSchema = z.object({
  phoneNumber: z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'invalid PhoneNumber').min(10).max(15),
  message: z.string().max(4096)
});

export const googleCalenderSchema = z.object({
  calendarId: z.string(),
  event: z.object({
    summary: z.string().max(100),
    start: z.date(),
    end: z.date()
  })
});

export const slackSchema = z.object({
  channel: z.string().max(100),
  message: z.string().max(4096)
});

export const telegramSchema = z.object({
  chatId: z.string(),
  message: z.string().max(4096)
});

export const messangerSchema = z.object({
  userId: z.string(),
  message: z.string().max(4096)
});

export const googleVoE3Schema = z.object({
  audioUrl: z.string().url(),
  language: z.string().length(2)
});