import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

interface MyJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export async function GET(req: NextRequest) {
  try {
    await connect();

    // ✅ Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 401 }
      );
    }

    // ✅ Verify token
    let decoded: MyJwtPayload;
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET!);
      if (typeof result === "string") {
        return NextResponse.json(
          { success: false, message: "Invalid token format" },
          { status: 401 }
        );
      }
      decoded = result as MyJwtPayload;
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

    // ✅ Fetch user from DB using decoded.id
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in /userData:", error.message, error.stack);
    } else {
      console.error("Error in /userData:", error);
    }

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
