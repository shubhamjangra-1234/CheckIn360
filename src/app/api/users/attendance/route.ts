import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Attendance from "@/models/attendance";
import jwt from "jsonwebtoken";

function getUserFromToken(req: NextRequest): { id: string; role: string } | null {
  const token = req.cookies.get("token")?.value; // ✅ simpler than manual split

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!); // ✅ use same secret as login
    return { id: decoded.id, role: decoded.role };
  } catch (err) {
    console.error("❌ JWT verification failed:", err);
    return null;
  }
}

// POST → Mark Check-in (Users only)
export async function POST(req: NextRequest) {
  try {
    await connect();

    const user = getUserFromToken(req);
    if (!user || !["user", "admin"].includes(user.role)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { date, checkIn, status, location, selfie } = await req.json();

    if (!date || !checkIn || !status || !location) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Prevent duplicate check-in
    const existing = await Attendance.findOne({ user: user.id, date });
    if (existing) {
      return NextResponse.json({ success: false, message: "Already checked in today" }, { status: 400 });
    }

    const attendance = new Attendance({ user: user.id, date, checkIn, status, location, selfie });
    await attendance.save();

    return NextResponse.json({ success: true, message: "Check-in marked", attendance }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT → Mark Check-out (Users only)
export async function PUT(req: NextRequest) {
  try {
    await connect();

    const user = getUserFromToken(req);
    if (!user || !["user", "admin"].includes(user.role)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { date, checkOut } = await req.json();

    if (!date || !checkOut) {
      return NextResponse.json({ success: false, message: "Date & Checkout required" }, { status: 400 });
    }

    const updated = await Attendance.findOneAndUpdate(
      { user: user.id, date },
      { $set: { checkOut, status: "Present" } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "No attendance found for today" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Check-out marked", attendance: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// GET → Fetch all attendance (Admin only)
export async function GET(req: NextRequest) {
  try {
    await connect();

    const user = getUserFromToken(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const records = await Attendance.find().populate("user", "name email company number");
    return NextResponse.json({ success: true, records });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
