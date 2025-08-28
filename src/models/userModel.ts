import mongoose, { Document, Schema, Model } from "mongoose";

// Define a TypeScript interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  number: number;
  company: string;
  password: string;
  role: "user" | "admin";
}

// Define schema with types
const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide a username"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  number: {
    type: Number,
    required: [true, "Please provide a number"],
    unique: true,
  },
  company: {
    type: String,
    required: [true, "Please provide a company name"],
    unique: false,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Use existing model if already compiled (important in Next.js)
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
