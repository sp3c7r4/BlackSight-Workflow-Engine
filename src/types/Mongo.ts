import { Types } from "mongoose";

export type ObjectId = Types.ObjectId

// Utility function for safe ObjectId conversion
export const toObjectId = (id: string): ObjectId => {
  return new Types.ObjectId(id) as ObjectId;
};

// Type guard to check if string is valid ObjectId
export const isValidObjectId = (id: string): boolean => {
  return Types.ObjectId.isValid(id);
};