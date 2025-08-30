import { Node } from ".";

export type IntegrationType = "google_sheet" | "stripe" | "zapier" | "airtable" | "sendgrid" | "whatsapp" | "google_calender" | "slack" | "telegram" | "messanger" | "google_voe_3";
export type IntegrationParams = google_sheet | stripe | zapier | airtable | sendgrid | whatsapp | google_calender | slack | telegram | messanger | google_voe_3;

type google_sheet = {
    spreadsheetId: string;
    range: string;
    values: unknown[][];
};

type stripe = {
    apiKey: string;
    amount: number;
    currency: string;
    description: string;
};

type zapier = {
    webhookUrl: string;
    data: Record<string, unknown>;
};

type airtable = {
    baseId: string;
    tableName: string;
    recordId: string;
    fields: Record<string, unknown>;
};

type sendgrid = {
    apiKey: string;
    to: string;
    from: string;
    subject: string;
    body: string;
};

type whatsapp = {
    phoneNumber: string;
    message: string;
};

type google_calender = {
    calendarId: string;
    event: {
        summary: string;
        start: Date;
        end: Date;
    };
};

type slack = {
    channel: string;
    message: string;
};

type telegram = {
    chatId: string;
    message: string;
};

type messanger = {
    userId: string;
    message: string;
};

type google_voe_3 = {
    audioUrl: string;
    language: string;
};

type IntegrationParamsMap = {
  google_sheet: google_sheet;
  stripe: stripe;
  zapier: zapier;
  airtable: airtable;
  sendgrid: sendgrid;
  whatsapp: whatsapp;
  google_calender: google_calender;
  slack: slack;
  telegram: telegram;
  messanger: messanger;
  google_voe_3: google_voe_3;
};

export interface IntegrationNode<C extends IntegrationType> extends Node<IntegrationParamsMap[C]> {
  type: C;
  category: "integration";
}
