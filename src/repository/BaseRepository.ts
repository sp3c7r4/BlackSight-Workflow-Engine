import { Model, Document, ObjectId } from "mongoose";
import { CE_BAD_REQUEST } from "../utils/Error";
import Logger, { consoleErrorLog } from "../utils/Logger";

export interface BaseRepositoryInterface<T extends Document> {
  create(data: Partial<T>): Promise<T | null>;
  findById(id: ObjectId): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: ObjectId, data: Partial<T>): Promise<T | null>;
  delete(id: ObjectId): Promise<boolean>;
}

const logInstance = new Logger()
const fileErrorLogger = (e: Error) => logInstance.fileLogger.error(e)

export default class BaseRepository<T extends Document> implements BaseRepositoryInterface<T> {
  constructor(protected model: Model<T>, private modelName: string) {}

  /**
   * Creates a new document in a transaction
   */
  async create(data: Partial<T>): Promise<T | null> {
    // const session = await this.model.db.startSession();
    let result: T | null = null;

    try {
      // await session.withTransaction(async () => {
      //   const newDocument = new this.model(data);
      //   result = await newDocument.save({ session }) as T;
      // });
      const newDocument = new this.model(data);
      result = await newDocument.save();
    } catch (error) {
      consoleErrorLog(`Error in create: ${error}`);
      fileErrorLogger(error);
      throw CE_BAD_REQUEST(`Failed to create ${this.modelName} document`);
    } finally {
      // await session.endSession();
    }

    return result;
  }

  /**
   * Finds a document by ID
   */
  async findById(id: ObjectId): Promise<T | null> {
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
  async update(id: ObjectId, data: Partial<T>): Promise<T | null> {
    // const session = await this.model.db.startSession();
    let result: T | null = null;

    try {
      // await session.withTransaction(async () => {
      //   result = await this.model.findByIdAndUpdate(id, data, {
      //     new: true,
      //     session,
      //   }).exec();
      // });
      result = await this.model.findByIdAndUpdate(id, data, {
        new: true
      }).exec();
    } catch (error) {
      consoleErrorLog(`Error in update: ${error}`);
      throw CE_BAD_REQUEST(`Failed to update ${this.modelName} document`);
    } finally {
      // await session.endSession();
    }

    return result;
  }

  /**
   * Deletes a document in a transaction
   */
  async delete(id: ObjectId): Promise<boolean> {
    // const session = await this.model.db.startSession();
    let success = false;

    try {
      // await session.withTransaction(async () => {
      //   const res = await this.model.findByIdAndDelete(id, { session }).exec();
      //   success = !!res;
      // });
      const res = await this.model.findByIdAndDelete(id).exec();
        success = !!res;
    } catch (error) {
      consoleErrorLog(`Error in delete: ${error}`);
      throw CE_BAD_REQUEST(`Failed to delete ${this.modelName} document`);
    } finally {
      // await session.endSession();
    }

    return success;
  }
}