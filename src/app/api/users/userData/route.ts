import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
  try {
    await connect();

    // ✅ Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "No token found" }, { status: 401 });
    }

    // ✅ Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    // ✅ Fetch user from DB using decoded.id (or decoded.email)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error in /userData:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
