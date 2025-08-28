import mongoose, { Schema, Document } from "mongoose";

export interface IAttendance extends Document {
  user: mongoose.Schema.Types.ObjectId; // reference to User
  date: string; // YYYY-MM-DD
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent";
  location?: string;
  selfie?: string; // base64 or URL of captured image
}

const AttendanceSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    checkIn: {
      type: String,
      default: "-",
    },
    checkOut: {
      type: String,
      default: "-",
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present",
    },
    location: {
      type: String,
    },
    selfie: {
      type: String,
    },
  },
  { timestamps: true }
);
const Attendance =
  mongoose.models.Attendance ||
  mongoose.model<IAttendance>("Attendance", AttendanceSchema);

export default Attendance;
