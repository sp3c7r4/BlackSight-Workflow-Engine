import { Model, Document, Types } from "mongoose";
import Logger from "../utils/Logger";
import env from "../config/env";
import { CE_BAD_REQUEST } from "../utils/Error";

export interface BaseRepositoryInterface<T extends Document> {
  create(data: Partial<T>): Promise<T | null>;
  findById(id: Types.ObjectId): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: Types.ObjectId, data: Partial<T>): Promise<T | null>;
  delete(id: Types.ObjectId): Promise<boolean>;
}

const logInstance = new Logger()
const ENV = env.ENV


const consoleErrorLog = (e: Error | string) => {
  if (ENV === 'development') {
    logInstance.logger.error(e)
  }
}

export default class BaseRepository<T extends Document> implements BaseRepositoryInterface<T> {
  constructor(private model: Model<T>, private modelName: string) {}

  /**
   * Creates a new document in a transaction
   */
  async create(data: Partial<T>): Promise<T | null> {
    const session = await this.model.db.startSession();
    let result: T | null = null;

    try {
      await session.withTransaction(async () => {
        const newDocument = new this.model(data);
        result = await newDocument.save({ session }) as T;
      });
    } catch (error) {
      consoleErrorLog(`Error in create: ${error}`);
      throw CE_BAD_REQUEST(`Failed to create ${this.modelName} document`);
    } finally {
      await session.endSession();
    }

    return result;
  }

  /**
   * Finds a document by ID
   */
  async findById(id: Types.ObjectId): Promise<T | null> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      consoleErrorLog(`Error in findById: ${error}`);
      throw CE_BAD_REQUEST(`Failed to find ${this.modelName} document`);
    }
  }

  /* Fetch all documents */
  async findAll(): Promise<T[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      consoleErrorLog(`Error in findAll: ${error}`);
      throw CE_BAD_REQUEST(`Failed to find ${this.modelName} documents`);
    }
  }

  /*  Updates a document in a transaction */
  async update(id: Types.ObjectId, data: Partial<T>): Promise<T | null> {
    const session = await this.model.db.startSession();
    let result: T | null = null;

    try {
      await session.withTransaction(async () => {
        result = await this.model.findByIdAndUpdate(id, data, {
          new: true,
          session,
        }).exec();
      });
    } catch (error) {
      consoleErrorLog(`Error in update: ${error}`);
      throw CE_BAD_REQUEST(`Failed to update ${this.modelName} document`);
    } finally {
      await session.endSession();
    }

    return result;
  }

  /**
   * Deletes a document in a transaction
   */
  async delete(id: Types.ObjectId): Promise<boolean> {
    const session = await this.model.db.startSession();
    let success = false;

    try {
      await session.withTransaction(async () => {
        const res = await this.model.findByIdAndDelete(id, { session }).exec();
        success = !!res;
      });
    } catch (error) {
      consoleErrorLog(`Error in delete: ${error}`);
      throw CE_BAD_REQUEST(`Failed to delete ${this.modelName} document`);
    } finally {
      await session.endSession();
    }

    return success;
  }
}