 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required!");
      toast.error("All fields are required!");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      toast.error("Password must be at least 6 characters long!");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const user = { name, email, password };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("isLoggedIn");
      setIsLoading(false);
      toast.success("Signup successful! Please login now 🎉");
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-700 flex items-center justify-center p-2 sm:p-4">
      {/* ✅ Toast Notification */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#1e1e1e",
            color: "#fff",
            padding: "12px 16px",
            fontSize: "14px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#1e1e1e",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#1e1e1e",
            },
          },
        }}
      />

      {/* Background animations */}
      <div className="hidden sm:block absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full blur-xl opacity-20 animate-bounce"></div>
      <div className="hidden sm:block absolute bottom-20 right-20 w-16 h-16 bg-orange-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="hidden sm:block absolute top-1/2 left-1/4 w-12 h-12 bg-rose-400 rounded-full blur-xl opacity-25 animate-ping"></div>

      <div className="relative w-full max-w-6xl flex flex-col lg:flex-row rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl mx-2 sm:mx-4">
        {/* Left section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-black/80 to-emerald-900/90 p-8 lg:p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6 lg:mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Mini Shop</h1>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight">
              Join Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Exclusive Community
              </span>
            </h2>
            <p className="text-gray-300 text-base lg:text-lg mb-6 lg:mb-8">
              Create your account and unlock a world of premium shopping experiences and exclusive benefits.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-3 lg:gap-4 mb-6 lg:mb-8">
            {[
              { icon: "🎁", text: "Exclusive Member Deals" },
              { icon: "🚀", text: "Early Access to New Collections" },
              { icon: "💎", text: "VIP Rewards Program" },
              { icon: "📱", text: "Personalized Shopping Experience" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 lg:space-x-3 text-white/80 text-sm lg:text-base"
              >
                <span className="text-lg lg:text-xl">{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile header */}
        <div className="lg:hidden bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Mini Shop</h1>
          </div>
          <h2 className="text-white text-lg opacity-90">Join Our Exclusive Community</h2>
        </div>

        {/* Right section - Signup form */}
        <div className="lg:w-1/2 w-full bg-white/95 backdrop-blur-xl p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col justify-center relative">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-6 lg:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Join our luxury shopping community
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-4 sm:mb-6 text-center text-sm sm:text-base">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4 sm:space-y-6">
              {/* Name */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-3 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-3 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-3 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Create a password (min. 6 characters)"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2 sm:py-3 px-4 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm sm:text-base"
              >
                <span className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </span>
              </button>

              {/* Redirect */}
              <div className="text-center pt-2 sm:pt-4">
                <p className="text-gray-600 text-sm sm:text-base">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-green-600 hover:text-green-500 font-semibold transition-colors duration-300 cursor-pointer"
                  >
                    Sign in now
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
