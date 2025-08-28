import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear cookie or session here
    const res = NextResponse.json({ message: "Logged out" });
    res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) }); 
    return res;
  } catch (err) {
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
