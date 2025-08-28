"use client";

import  Link  from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  Search, 
  Calendar, 
  Clock, 
  User,
  Building,
  Mail,
  Phone,
  TrendingUp,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState, useEffect } from "react";

type AttendanceRecord = {
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  company?: string;
  number?: string;
  role: string;
  status: string;
};

export default function UserAttendance() {
  const { id } = useParams();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  if (!id) return;
  // ✅ This is fine

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      setUser(data.user);
      setAttendance(data.attendance || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);


  const filteredAttendance = attendance.filter((rec) =>
    rec.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateHours = (checkIn: string, checkOut: string) => {
    if (checkIn === "-" || checkOut === "-") return "-";
    try {
      const inTime = new Date(`2024-01-01 ${checkIn}`);
      const outTime = new Date(`2024-01-01 ${checkOut}`);
      const diffMs = outTime.getTime() - inTime.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      return `${diffHours.toFixed(1)}h`;
    } catch {
      return "-";
    }
  };

  const stats = {
    totalDays: attendance.length,
    presentDays: attendance.filter(r => r.status === "Present").length,
    absentDays: attendance.filter(r => r.status === "Absent").length,
    attendanceRate: attendance.length > 0 ? Math.round((attendance.filter(r => r.status === "Present").length / attendance.length) * 100) : 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Attendance Records</h2>
          <p className="text-gray-500">Please wait while we fetch the data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Admin</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-xl font-bold text-gray-900">CheckIn360</span>
              </Link>
            </div>
          
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8">
        {/* User Profile div */}
        <div className="mb-8 overflow-hidden shadow-md ">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center space-x-6">
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                <div className="flex items-center space-x-4 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  {user?.number && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{user.number}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white  px-8 py-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Building className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-semibold text-gray-900">{user?.company || "-"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold text-gray-900">{user?.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <UserCheck className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div>
                    {user?.status}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="font-semibold text-gray-900">#{user?._id.slice(-6).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats divs */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="">
            <div className="flex items-center rounded-md bg-blue-100 p-4 justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Days</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalDays}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="">
            <div className="flex items-center rounded-md bg-blue-100 p-4 justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present Days</p>
                <p className="text-3xl font-bold text-green-600">{stats.presentDays}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="">
            <div className="flex items-center rounded-md bg-blue-100 p-4 justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absent Days</p>
                <p className="text-3xl font-bold text-red-600">{stats.absentDays}</p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="">
            <div className="flex items-center rounded-md bg-blue-100 p-4 justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-3xl font-bold text-blue-600">{stats.attendanceRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div>
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Attendance Records</h2>
                <p className="text-gray-600 mt-1">Complete attendance history for {user?.name}</p>
              </div>
              <div className="flex text-zinc-800 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 md:mt-2 rounded-md border p-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {filteredAttendance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Check In</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Check Out</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Hours</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((record, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-sm text-gray-900">
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-green-500" />
                          <span className="text-gray-900 text-sm">{record.checkIn}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-red-500" />
                          <span className="text-gray-900 text-sm">{record.checkOut}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-sm text-gray-700">
                          {calculateHours(record.checkIn, record.checkOut)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div 
                        
                          className={
                            record.status === "Present" 
                              ? "bg-green-100 p-2 text-sm text-green-800" 
                              : record.status === "Absent"
                              ? "bg-red-100 text-sm text-red-800"
                              : "bg-yellow-100 text-sm text-yellow-800"
                          }
                        >
                          {record.status === "Present" ? (
                            <UserCheck className="w-3 h-3 mr-1" />
                          ) : (
                            <UserX className="w-3 h-3 mr-1" />
                          )}
                          {record.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? "No attendance records match your search criteria." : "No attendance records available for this user."}
              </p>
              {searchTerm && (
                <button onClick={() => setSearchTerm("")}>
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
