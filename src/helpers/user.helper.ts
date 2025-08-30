import { ObjectId } from "mongoose";
import UserModel from "../model/user.model";
import { CE_BAD_REQUEST } from "../utils/Error";

export const getUserById = async (id: ObjectId) => {
  const r = await UserModel.findById(id);
  if(!r) throw CE_BAD_REQUEST('User not found')
  return r;
}