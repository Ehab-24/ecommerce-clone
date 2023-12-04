import mongoose, { Document, Model } from 'mongoose';

// Interface for User document
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

// Interface for User model
export interface UserModel extends Model<UserDocument> {
  // Add any static methods here if needed
}

const UserSchema = new mongoose.Schema<UserDocument>({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.models.User as UserModel || mongoose.model<UserDocument, UserModel>('User', UserSchema);

export default User as UserModel;