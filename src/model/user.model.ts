import { model, Schema } from 'mongoose';

interface User { email: string; name: string; }
interface IUser extends Document, User {}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
})

const UserModel = model<IUser>('user', UserSchema);
export default UserModel;
export type UserModelType = IUser;