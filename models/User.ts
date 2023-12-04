import mongoose, { Document, Model } from 'mongoose';

// Interface for User document
interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

// Interface for User model
interface UserModel extends Model<UserDocument> {
  // Add any static methods here if needed
}

const UserSchema = new mongoose.Schema<UserDocument, UserModel>({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.models.User || mongoose.model<UserDocument, UserModel>('User', UserSchema);

export default User;