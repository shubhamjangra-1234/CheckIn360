"use client";

import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Camera,
  CheckCircle,
  XCircle,
  Mail,
  Building,
  Phone
} from "lucide-react";
import Records from "../records/page";
import Image from "next/image";
export default function Attendance() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [location, setLocation] = useState("Fetching...");
  const [showCamera, setShowCamera] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selfieDisabled, setSelfieDisabled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [refreshRecords, setRefreshRecords] = useState(false);
interface User {
  _id: string;
  name: string;
  email: string;
  company?: string;
  number?: string;
  role?: string;
}
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${window.location.origin}/api/users/userData`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setUser(data.user);
        } else {
          console.log("Not logged in:", data.message);
        }
      } catch (err: unknown) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);
  // ✅ Keep updating clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ✅ Get location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation(
            `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
          ),
        () => setLocation("Location unavailable")
      );
    }
  }, []);

  // ✅ Fetch today's attendance
  useEffect(() => {
    if (!user) return;

    const fetchTodayAttendance = async () => {
      const today = new Date().toISOString().split("T")[0];
      try {
        const res = await fetch("/api/users/records", { credentials: "include" });
        const data = await res.json();

        if (res.ok) {
          const todayRecord = data.records.find((r: Record<string, unknown>) => r.date === today);

          if (todayRecord) {
            if (!todayRecord.checkOut) {
              // Checked in, not yet checked out
              setIsCheckedIn(true);
              setButtonDisabled(false);
              setSelfieDisabled(true);
            } else {
              // Already checked out
              setIsCheckedIn(false);
              setButtonDisabled(true);
              setSelfieDisabled(true);
            }
          }
        }
      } catch (err: unknown) {
  console.error("Error fetching attendance:", err);
  toast.error("Something went wrong");
}

    };

    fetchTodayAttendance();
  }, [user]);

  // ✅ Start camera
  const startCamera = async () => {
    if (selfieDisabled) return;
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
  toast.error("Camera access denied");
}

  };

  // ✅ Stop camera
  const stopCamera = () => {
    setShowCamera(false);
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((t) => t.stop());
    }
  };

  // ✅ Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        setCapturedImage(canvasRef.current.toDataURL("image/png"));
        stopCamera();
        toast.success("Selfie captured ✅");
      }
    }
  };
  // ✅ Handle Check In / Check Out
  const markAttendance = async () => {
    if (!user) {
      toast.error("User not found, please log in");
      return;
    }

    if (!isCheckedIn && !capturedImage) {
      toast.error("Please capture a selfie 📸 before marking attendance");
      return;
    }

    const today = currentTime.toISOString().split("T")[0];

    try {
      if (!isCheckedIn) {
        // --- CHECK IN ---
        const res = await fetch("/api/users/attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: user._id,
            date: today,
            checkIn: currentTime.toLocaleTimeString(),
            status: "Present",
            location,
            selfie: capturedImage,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setIsCheckedIn(true);
          setSelfieDisabled(true);
          toast.success("Checked In ✅");
          setRefreshRecords((prev) => !prev); // 🔄 trigger records refresh

        } else {
          toast.error(data.message || "Failed to check in");
        }
      } else {
        // --- CHECK OUT ---
        const res = await fetch("/api/users/attendance", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: user._id,
            date: today,
            checkOut: currentTime.toLocaleTimeString(),
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setIsCheckedIn(false);
          setButtonDisabled(true);
          toast.success("Checked Out 👋");
          setRefreshRecords((prev) => !prev); // 🔄 trigger records refresh

        } else {
          toast.error(data.message || "Failed to check out");
        }
      }
    } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Unexpected error:", err.message, err.stack);
  } else {
    console.error("Unexpected error:", err);
  }

  toast.error("Something went wrong");
}

  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
         {/* User Welcome div */}
        <div className="mb-8 my-12 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center space-x-6">
              <div className="text-white">
                <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.name}!</h1>
                <p className="text-blue-100">Ready to mark your attendance for today</p>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-white px-8 py-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium text-gray-900">{user?.company || "Not Provided"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{user?.number || "Not Provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Attendance Booth */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-gray-900 mb-2 text-center">
            Attendance Booth
          </h1>
          <h2 className="text-sm text-gray-500 text-center mb-6">
            Add your daily attendance with a selfie 📸
          </h2>

          {/* Status */}
          <div className="flex justify-center mb-6">
            <div
              className={`flex items-center px-4 py-2 text-lg rounded-lg ${isCheckedIn
                ? "bg-green-100 text-green-800"
                : "bg-gray-300 text-gray-600"
                }`}
            >
              {isCheckedIn ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" /> Checked In
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 mr-2" /> Checked Out
                </>
              )}
            </div>
          </div>

          {/* Camera */}
          {showCamera && !selfieDisabled && (
            <div className="mb-6">
              <div className="relative bg-black rounded-lg overflow-hidden mx-auto max-w-md">
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-auto h-auto"
                  style={{ transform: "scaleX(-1)" }}
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <button
                    onClick={capturePhoto}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    <Camera className="w-5 h-5 inline " />
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-red-500 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Captured Image */}
          {capturedImage && (
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Selfie captured successfully!
              </p>
              <Image
                src={capturedImage}
                alt="Captured selfie"
                className="w-1/3 h-1/3 rounded-md mx-auto object-cover shadow-lg"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col items-center space-y-4">
            {!showCamera && !capturedImage && !selfieDisabled && (
              <button
                onClick={startCamera}
                disabled={selfieDisabled}
                className="flex items-center space-x-2 border border-zinc-600 px-4 py-2 rounded-lg disabled:opacity-50"
              >
                <Camera className="w-5 h-5 text-zinc-600" />
                <span className="text-zinc-600">Take Selfie (Required)</span>
              </button>
            )}

            <button
              onClick={markAttendance}
              disabled={buttonDisabled}
              className={`px-6 py-2 text-lg font-semibold rounded-lg text-white ${buttonDisabled
                ? "bg-green-400 cursor-not-allowed"
                : isCheckedIn
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {buttonDisabled
                ? "Already Done "
                : isCheckedIn
                  ? "Check Out"
                  : "Check In"}
            </button>
          </div>
        </div>

        {/* Attendance Records Component */}
        <Records key={refreshRecords ? "refresh-1" : "refresh-0"} />

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
