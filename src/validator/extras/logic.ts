import z from "zod";

export const createLogicNodeSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.literal("logic"),
  category: z.enum(["condition", "action", "loop"]),
  data: z.object({
    params: z.object({}).passthrough()
  }),
})

export const ifElseSchema = z.object({
  condition: z.string().min(2).max(100),
  ifTrue: z.array(z.string().min(2).max(100)),
  ifFalse: z.array(z.string().min(2).max(100))
});

export const switchCaseSchema = z.object({
  expression: z.string().min(2).max(100),
  cases: z.array(z.object({
    case: z.string().min(2).max(100),
    actions: z.array(z.string().min(2).max(100))
  })),
  default: z.array(z.string().min(2).max(100))
});

export const waitDelaySchema = z.object({
  duration: z.number().min(0),
  unit: z.enum(["seconds", "minutes", "hours"])
});

export const compareTagsSchema = z.object({
  tags: z.array(z.string().min(2).max(100)),
  condition: z.enum(["all", "any"])
});

export const checkFieldSchema = z.object({
  field: z.string().min(2).max(100),
  condition: z.enum(["exists", "not_exists"]),
  value: z.string().min(2).max(100)
});
