import { Node } from ".";

export type AiType = "text_generation" | "ai_summarizer" | "ai_intent_detection" | "analyze_sentiment";
export type AiParams = TextGeneration | AiSummarizer | AiIntentDetection ;

type TextGeneration = {
  text: string;
  output_length: "short" | "medium" | "long";
};

type AiSummarizer = {
  text: string;
  summary_length: "short" | "medium" | "long";
};

type AiIntentDetection = {
  text: string;
  intent: string;
};

type AiParamsMap = {
  text_generation: TextGeneration;
  ai_summarizer: AiSummarizer;
  ai_intent_detection: AiIntentDetection;
  analyze_sentiment: unknown; // Add fields if needed for this category
};

export interface AiNode<C extends AiType> extends Node<AiParamsMap[C]> {
  type: C;
  category: "ai";
}

// const me: AiNode<"text_generation"> = {
//   config: {
//     params: {

//     }
//   }
// }