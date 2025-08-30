import * as actionSchema from './extras/action'
import * as aiSchema from './extras/ai'
import * as triggerSchema from './extras/trigger'
import * as integrationSchema from './extras/integration'
import * as logicSchema from './extras/logic'
import z from 'zod'
import { objectIdSchema } from '../types/Mongo'

export const createNodeSchema = z.object({
  category: z.enum(['trigger', 'action', 'logic', 'ai', 'integration']),
  type: z.string().min(2).max(100),
  workflow_id: objectIdSchema,
  config: z.object({
    params: z.object({}).passthrough()
  }),
  name: z.string().min(2).max(100),
  position: z.object({
    x: z.number().min(0),
    y: z.number().min(0),
  }),
});

export const createWorkFlowSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(2).max(500),
  user_id: objectIdSchema,
  // nodes: z.array(objectIdSchema),
  // edges: z.array(z.object({
  //   source: objectIdSchema,
  //   target: objectIdSchema,
  //   condition: z.string().optional()
  // }))
});

export const IDSchema = z.object({
  id: objectIdSchema
})

export { actionSchema, aiSchema, triggerSchema, integrationSchema, logicSchema }