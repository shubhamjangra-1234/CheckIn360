import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Attendance from "@/models/attendance";
import jwt from "jsonwebtoken";

connect();

export async function GET(req: Request) {
  try {
    // ✅ Get token from headers (cookies in App Router require headers)
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    // ✅ Fetch only that user's attendance records
    const records = await Attendance.find({ user: userId }).sort({ date: -1 });

    return NextResponse.json({ success: true, records });
  } catch (error: any) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching attendance records" },
      { status: 500 }
    );
  }
}

