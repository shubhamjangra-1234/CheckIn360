import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Attendance from "@/models/attendance";
import jwt from "jsonwebtoken";

connect();

interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export async function GET(req: Request) {
  try {
    // ✅ Get token from cookies in header
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    let decoded: JwtPayload | null = null;

    try {
      const result = jwt.verify(token, process.env.JWT_SECRET!);

      if (typeof result === "string") {
        console.error("❌ Unexpected string payload:", result);
        return NextResponse.json(
          { success: false, message: "Invalid token" },
          { status: 401 }
        );
      }

      decoded = result as JwtPayload;
      console.log("✅ Decoded JWT:", decoded.id, decoded.role);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("❌ JWT verification failed:", err.message);
      } else {
        console.error("❌ JWT verification failed:", err);
      }
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const userId = decoded.id;

    // ✅ Fetch only that user's attendance records
    const records = await Attendance.find({ user: userId }).sort({ date: -1 });

    return NextResponse.json({ success: true, records });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching attendance:", error.message, error.stack);
    } else {
      console.error("Error fetching attendance:", error);
    }

    return NextResponse.json(
      { success: false, message: "Error fetching attendance records" },
      { status: 500 }
    );
  }
}
