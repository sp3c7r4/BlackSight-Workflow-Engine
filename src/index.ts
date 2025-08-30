import express, { Request, Response } from 'express';
import connectRedis, { redis } from './db/Redis';
import env from './config/env';
import Logger from './utils/Logger';
import chalk from 'chalk';
import nodeRouter from './routes/nodes.routes';
import instanceRouter from './routes/instances.routes';
import workflowRouter from './routes/workflows.routes';
import connectNoSql from './db/Mongo';

const app = express();

/** Environment Variables */
const PORT = env.PORT;
const API_VERSION = env.API_VERSION || 'v1';
const ROOT_PATH = `/api/${API_VERSION}`;

const logInstance = new Logger();
const log = logInstance.logger;

app.use(express.json());
app.use((req, _, next) => {
  logInstance.requestLogger(req.method, req.url, req.body);
  next();
});

app.use(`${ROOT_PATH}/nodes`, nodeRouter);
app.use(`${ROOT_PATH}/workflows`, workflowRouter);
app.use(`${ROOT_PATH}/instances`, instanceRouter);

(async () => {
  await connectNoSql();
  await connectRedis(redis);
})()

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to BlackSight WorkFlow Apis by sp3c7r4' });
});

app.listen(PORT, () => {
  console.log(`Access the API at ${chalk.green(`http://localhost:${PORT}`)} 🌐\n`);
  log.info(`Server running on port ${PORT}`);
});