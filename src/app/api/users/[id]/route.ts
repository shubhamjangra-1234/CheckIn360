import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Attendance from "@/Models/Attendance";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connect();

  try {
    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // find user (basic details)
    const user = await User.findById(params.id).select("-password"); // hide password

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // fetch attendance records for this user
    const attendance = await Attendance.find({ user: params.id }).sort({ date: -1 });

    return NextResponse.json({
      user,
      attendance,
    });
  } catch (err: any) {
    console.error("❌ Error fetching user + attendance:", err.message);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
