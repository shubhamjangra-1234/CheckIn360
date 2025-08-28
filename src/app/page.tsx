"use client";
import Link from "next/link";
import { Check } from "lucide-react"
export default function HomePage() {
  return (
    
    <div className="min-h-screen bg-white ">

      {/* Hero Section */}
      <section className="px-6 md:px-8 lg:px-12 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto  mt-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                  BEST ATTENDANCE MANAGEMENT SYSTEM
                </div>
                
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  CheckIn360 makes attendance easy.
                </h1>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-lg text-gray-700">Real-time Attendance Location</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-lg text-gray-700">Live Headcount at Site</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-lg text-gray-700">Track Working Hours</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-lg text-gray-700">Custom Leave Management</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                    Get Started
                  </button>
                  <button
                  
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg">
                    Request Callback
                  </button>
                </div>
                <p className="text-sm text-gray-500">No Credit Card Required.</p>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200">
                {/* Professional woman image placeholder */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="w-64 h-80 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-full"></div>
                </div>
                
                {/* Dashboard mockups */}
                <div className="absolute top-8 left-8 w-64 bg-white rounded-lg shadow-lg p-2">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-600 text-center">Employee</span>
                    <span className="text-sm font-medium text-gray-600 text-center">Attendance</span>
                    <span className="text-sm font-medium text-gray-600 text-center">Last Location</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 bg-blue-100 rounded-full mb-1"></div>
                      <span className="text-xs text-gray-600">Geeta John</span>
                    </div>
                    <span className="text-xs text-gray-500 text-center">Punched Out</span>
                    <span className="text-xs text-gray-500 text-center">
                      Last Thursday at 5:00 PM<br />Vasant Vihar, NEW DELHI 110060, India
                    </span>
                  </div>
                </div>

                {/* Attendance stats */}
                <div className="absolute top-32 right-8 w-44 bg-white rounded-lg shadow-lg p-2 flex flex-col items-center">
                  <div className="relative w-26 h-26 mb-2 flex items-center justify-center">
                    <div className="w-26 h-26 rounded-full border-4 border-gray-200"></div>
                    <div className="absolute inset-0 w-26 h-26 rounded-full border-4 border-red-500 border-t-transparent rotate-45"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                      All Employees
                    </span>
                  </div>
                  <div className="flex justify-between w-full text-xs mt-2">
                    <div className="text-center flex-1">
                      <div className="font-bold text-gray-800">16</div>
                      <div className="text-gray-500">Present</div>
                    </div>
                    <div className="text-center flex-1">
                      <div className="font-bold text-gray-800">5</div>
                      <div className="text-gray-500">Absent</div>
                    </div>
                  </div>
                </div>

                {/* Working hours chart */}
                <div className="absolute bottom-8 left-8 w-52 bg-white rounded-lg shadow-lg p-4">
                  <div className="text-sm font-medium text-gray-700 mb-3">Average Working Hours</div>
                  <div className="flex items-end space-x-2 h-20">
                    <div className="flex-1 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
                    <div className="flex-1 bg-blue-500 rounded-t" style={{height: '80%'}}></div>
                    <div className="flex-1 bg-blue-500 rounded-t" style={{height: '100%'}}></div>
                    <div className="flex-1 bg-blue-500 rounded-t" style={{height: '70%'}}></div>
                    <div className="flex-1 bg-blue-500 rounded-t" style={{height: '90%'}}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">This Week</div>
                </div>

                {/* Chat widget */}
                <div className="absolute bottom-8 right-8 w-36 bg-white rounded-lg shadow-lg p-3">
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium text-gray-700 mr-2">Chat With Us</span>
                    <Link href="/contact" className="text-lg" aria-label="Contact Us">
                      📞
                    </Link>
                  </div>
                  <div className="text-xs text-gray-500">How can we help you?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* Features Section */}
      <section className="px-6 md:px-8 lg:px-12 py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Experience the future of Attendance & Leave Management
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Real-time Attendance */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Attendance</h3>
              <p className="text-gray-600 text-sm">
                One simple dashboard that shows who is working, on leave, or who has not shown up for work.
              </p>
            </div>

            {/* Track Working Hours */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculate working hours</h3>
              <p className="text-gray-600 text-sm">
                Create custom shifts and calculate working hours of your field force.
              </p>
            </div>

            {/* Calendar System */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Calendar System</h3>
              <p className="text-gray-600 text-sm">
                Integrated calendar for scheduling shifts, managing holidays, and tracking leave requests efficiently.
              </p>
            </div>

            {/* Monitor Headcount */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Monitor Headcount at a Site/Office</h3>
              <p className="text-gray-600 text-sm">
                CheckIn360 can automatically tell you how many people are at a particular site or office location.
              </p>
            </div>
          </div>

          
        </div>
      </section>
      {/* Pricing Section */}
      <section className="px-6 md:px-8 lg:px-12 py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 text-lg">Choose a plan that fits your business needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-200 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">₹499<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <ul className="text-gray-700 text-sm mb-6 space-y-2">
                <li>Up to 25 Employees</li>
                <li>Attendance Tracking</li>
                <li>Email Support</li>
              </ul>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Choose Basic</button>
            </div>
            {/* Standard Plan */}
            <div className="bg-white rounded-xl p-8 shadow-md border-2 border-blue-600 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Standard</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">₹999<span className="text-lg font-normal text-gray-500">/mo`</span></div>
              <ul className="text-gray-700 text-sm mb-6 space-y-2">
                <li>Up to 100 Employees</li>
                <li>Leave Management</li>
                <li>Priority Support</li>
              </ul>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Choose Standard</button>
            </div>
            {/* Enterprise Plan */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-200 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">Custom</div>
              <ul className="text-gray-700 text-sm mb-6 space-y-2">
                <li>Unlimited Employees</li>
                <li>Custom Integrations</li>
                <li>Dedicated Manager</li>
              </ul>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-6 md:px-8 lg:px-12 py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Trusted by businesses across India</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md flex flex-col">
              <p className="text-gray-700 text-base mb-4">
                “CheckIn360 has made our attendance management seamless. The real-time location feature is a game changer for our field teams.”
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-blue-600">A</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Amit Sharma</div>
                  <div className="text-xs text-gray-500">HR Manager, TechNova</div>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md flex flex-col">
              <p className="text-gray-700 text-base mb-4">
                “We love the dashboard and leave management tools. Our employees find it easy to use and our admin work has reduced drastically.”
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-green-600">S</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sneha Verma</div>
                  <div className="text-xs text-gray-500">Operations Lead, BuildWell</div>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md flex flex-col">
              <p className="text-gray-700 text-base mb-4">
                “The support team is fantastic and always available. Highly recommend CheckIn360 for any growing business.”
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-purple-600">R</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Rahul Singh</div>
                  <div className="text-xs text-gray-500">CEO, UrbanWorks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
