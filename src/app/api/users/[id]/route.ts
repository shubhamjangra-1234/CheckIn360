import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Attendance from "@/models/attendance";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 FIX
) {
  await connect();

  try {
    // ✅ unwrap the params
    const { id } = await context.params;

    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // find user
    const user = await User.findById(id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // fetch attendance
    const attendance = await Attendance.find({ user: id }).sort({ date: -1 });

    return NextResponse.json({ user, attendance }, { status: 200 });
  } catch (err: unknown) {
    console.error("❌ Error fetching user + attendance:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
