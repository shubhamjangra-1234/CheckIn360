"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Users,  TrendingUp, Search,
   UserCheck, Building,
   Settings, LogOut, Home, BarChart3,
  FileText, Menu
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios"
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
  lastLogin?: string;
  joinDate?: string;
  attendance: AttendanceRecord[];
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [admin, setAdmin] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get("/api/users/userData"); // fetch user info from token
        setAdmin(res.data.user); // assumes API returns { user: { name, email, role } }
      } catch (error) {
        console.error("Failed to fetch admin details:", error);
      }
    };
    fetchAdmin();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin");

        if (!res.ok) throw new Error("Failed to fetch admin data");

        const data = await res.json();
        const adminUsers: User[] = data.users || [];
        setUsers(adminUsers);
      } catch (err) {
        console.error("Error fetching admin users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",           // make sure your route accepts POST
        credentials: "include",
      });
      if (res.ok) {
        // Clear any leftover localStorage token if you ever set one
        try { localStorage.removeItem("token"); } catch { }
        toast.success("Logged out successfully");
        // Let other components know auth changed
        window.dispatchEvent(new Event("auth-changed"));
        router.push("/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === "active").length,
    totalCompanies: new Set(users.map(u => u.company).filter(Boolean)).size,
    newUsersThisMonth: users.filter(u =>
      u.joinDate && new Date(u.joinDate) > new Date("2025-08-01")
    ).length
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase(); // single name
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase(); // first + last
  };
  return (
    <div className="w-full h-screen bg-white flex ">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static md:flex md:flex-col`}
      >
        {/* Logo + Title */}
        <div className="p-6 flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">CheckIn360</span>
          </Link>
          <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="px-4 pb-6 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {[
              { tab: "overview", icon: BarChart3, label: "Overview" },
              { tab: "users", icon: Users, label: "Users" },
              { tab: "reports", icon: FileText, label: "Reports" },
              { tab: "settings", icon: Settings, label: "Settings" },
            ].map(({ tab, icon: Icon, label }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20  bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Mobile header */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 truncate">
            {activeTab === "users"
              ? "User Management"
              : activeTab === "overview"
                ? "Dashboard Overview"
                : activeTab === "reports"
                  ? "Reports & Analytics"
                  : "Settings"}
          </h1>
          <div></div>
        </header>

        {/* Desktop header */}
        <header className="hidden md:flex border-b border-gray-200 px-6 py-4 justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === "users"
                ? "User Management"
                : activeTab === "overview"
                  ? "Dashboard Overview"
                  : activeTab === "attendance"
                    ? "Attendance Management"
                    : activeTab === "reports"
                      ? "Reports & Analytics"
                      : "Settings"}
            </h1>
            <p className="text-gray-600 mt-1">
              {activeTab === "users"
                ? "Manage and monitor all system users"
                : activeTab === "overview"
                  ? "System overview and key metrics"
                  : "Configure system settings and preferences"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {admin ? getInitials(admin.name) : "A"}
                </span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{admin ? admin.name : "Loading..."}</div>
                <div className="text-gray-500">{admin ? admin.email : ""}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === "users" && (
            <div className="space-y-6 max-w-screen  p-2 ">
              <p className="text-sm text-gray-700 text-center">Here is the user management section</p>
              {/* Search */}
              <div className="relative my-2 text-center max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-4 h-4" />
                <input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border rounded-md py-2 px-3 text-zinc-900 w-full text-sm"
                />
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full  divide-y divide-gray-200 text-sm">
                  <thead className="bg-blue-400">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">User</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700"> Number</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Role</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            <span>Loading users...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          {/* User Info */}
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-3">
                              <div className="truncate">
                                <div className="font-medium text-gray-900 truncate">{user.name}</div>
                              </div>
                            </div>
                          </td>

                          {/* Company */}
                          <td className="px-4 py-3">
                            <div className="text-gray-500 truncate">{user.number || "-"}</div>
                          </td>

                          {/* Role */}
                          <td className="px-4 py-3 text-gray-700">{user.role || "-"}</td>

                          {/* Attendance */}
                          <td className="py-3 px-4">
                            <Link href={`/admin/${user._id}/attendance`}>
                              <button className="text-blue-600 hover:underline">
                                View Attendance
                              </button>
                            </Link>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500">
                          No users found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>


            </div>
          )}

          {activeTab === "overview" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 m-2 gap-6">
              <div className="p-6 border bg-green-100 rounded-lg">
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-blue-600" />
                  <div className="ml-4 ">
                    <p className="text-sm font-medium text-gray-600">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalUsers}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 border rounded-lg">
                <div className="flex items-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Active Users
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.activeUsers}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 border rounded-lg">
                <div className="flex items-center">
                  <Building className="w-6 h-6 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Companies</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalCompanies}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 border rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      New This Month
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.newUsersThisMonth}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "attendance" ||
            activeTab === "reports" ||
            activeTab === "settings") && (
              <div className="p-8 text-center text-gray-600">
                Coming soon... API integration pending.
              </div>
            )}
        </main>
      </div>
    </div>

  );
}
