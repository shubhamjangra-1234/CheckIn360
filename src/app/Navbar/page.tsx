
"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading
  const router = useRouter();
  const pathname = usePathname();
  interface User {
  _id: string;
  name: string;
  email: string;
  company?: string;
  number?: string;
  role: string;   // "admin" | "user"
}
  const [user, setUser] = useState<User | null>(null);  // ✅ type-safe

  // Check auth via cookie by calling your userData API
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/users/userData", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setUser(data.user); // ✅ store full user object (with role)
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoggedIn(res.ok);
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  // Initial check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Re-check on route change
  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);

  // Re-check on window focus and when we dispatch a custom "auth-changed" event
  useEffect(() => {
    const onFocus = () => checkAuth();
    const onAuthChanged = () => checkAuth();
    window.addEventListener("focus", onFocus);
    window.addEventListener("auth-changed", onAuthChanged);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("auth-changed", onAuthChanged);
    };
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",           // make sure your route accepts POST
        credentials: "include",
      });
      if (res.ok) {
        // Clear any leftover localStorage token if you ever set one
        try { localStorage.removeItem("token"); } catch { }
        setIsLoggedIn(false);
        toast.success("Logged out successfully");
        // Let other components know auth changed
        window.dispatchEvent(new Event("auth-changed"));
        router.push("/login");
      }
    } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Logout failed:", err.message);
  } else {
    console.error("Logout failed:", err);
  }
}

  };

  return (
    <nav className="fixed top-0 mb-4 left-0 w-full z-50">
      <div className="w-full m-2 py-2 px-6 flex justify-between items-center">
        <Link href="/" className="inline-flex items-center space-x-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-sm"></div>
          </div>
          <span className="text-2xl font-bold text-gray-900">CheckIn360</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link href="/" className="hover:text-red-500 cursor-pointer font-sans text-zinc-700">
              Home
            </Link>
          </li>
          <li>
            <Link href="/attendance" className="hover:text-red-500 cursor-pointer font-sans text-zinc-700">
              Attendance
            </Link>
          </li>
          <li>
            {/* Show Admin button only if logged in user is admin */}
            {user?.role === "admin" && (
            <Link href="/admin" className="hover:text-red-500 cursor-pointer font-sans text-zinc-700">
              Admin
            </Link>
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 py-2 px-4 rounded-md font-sans text-white text-center hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 py-2 px-4 rounded-md font-sans text-white text-center hover:bg-blue-700"
              >
                Get Started
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-[100] text-zinc-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-400 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        <ul className="px-6 py-20 space-y-6">
          <li>
            <Link href="/" className="hover:text-red-500 cursor-pointer text-zinc-100 block">
              Home
            </Link>
          </li>
          <li>
            <Link href="/attendance" className="hover:text-red-500 cursor-pointer text-zinc-100 block">
              Attendance
            </Link>
          </li>
          <li>
            {/* Show Admin button only if logged in user is admin */}
            {user?.role === "admin" && (
              <Link href="/admin">Admin</Link>
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 w-full py-2 px-4 rounded-md font-sans text-white text-center hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 w-full py-2 px-4 rounded-md font-sans text-white text-center hover:bg-blue-700"
              >
                Get Started
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
