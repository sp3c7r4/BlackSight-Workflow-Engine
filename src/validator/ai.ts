import z from "zod";

export const createAiNodeSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.literal("ai"),
  category: z.enum(["text_generation", "image_generation", "code_generation"]),
  data: z.object({
    params: z.object({}).passthrough()
  }),
});

export const textGenerationSchema = z.object({
  text: z.string().min(5),
  output_length: z.enum(["short", "medium", "long"]),
});

export const aiSummarizerSchema = z.object({
  text: z.string().min(5),
  summary_length: z.enum(["small", "medium", "large"]),
});

export const aiIntentDetectionSchema = z.object({
  text: z.string().min(5),
  intent: z.string(),
});
