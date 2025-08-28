import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Attendance from "@/models/attendance";

export async function GET() {
  try {
    await connect();

    const users = await User.find(
      {},
      "_id name email company number role status lastLogin joinDate"
    );

    const records = await Attendance.find({}, "user date checkIn checkOut status");

    const usersWithRecords = users.map((user: any) => {
      // 🟢 DEBUG log: check what we're comparing
      console.log("Checking user:", user._id.toString());

      const userRecords = records.filter((rec: any) => {
        console.log("Record user:", rec.user.toString()); // log rec.user
        return rec.user.toString() === user._id.toString();
      });

      console.log("Found records for user:", userRecords.length);

      return {
        ...user.toObject(),
        attendance: userRecords.map((rec: any) => ({
          date: rec.date,
          checkIn: rec.checkIn,
          checkOut: rec.checkOut,
          status: rec.status,
        })),
      };
    });

    return NextResponse.json({ success: true, users: usersWithRecords }, { status: 200 });
  } catch (err) {
    console.error("Admin API error", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
