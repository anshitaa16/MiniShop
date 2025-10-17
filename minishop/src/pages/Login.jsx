import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      setError("No user found. Please sign up first.");
      toast.error("No user found. Please sign up first!");
      setIsLoading(false);
      return;
    }

    if (savedUser.email === email && savedUser.password === password) {
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", true);
        setIsLoading(false);
        toast.success("Login successful 🎉");
        setTimeout(() => navigate("/products"), 800);
      }, 1000);
    } else {
      setIsLoading(false);
      setError("Invalid email or password!");
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-cyan-700 flex items-center justify-center p-2 sm:p-4 relative">
      {/* ✅ Toast Container */}
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
            boxShadow: "0 0 20px rgba(0,0,0,0.6)",
          },
          success: {
            iconTheme: { primary: "#22c55e", secondary: "#1e1e1e" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#1e1e1e" },
          },
        }}
      />

      {/* Animated Background Elements */}
      <div className="hidden sm:block absolute top-10 left-10 w-20 h-20 bg-pink-500 rounded-full blur-xl opacity-20 animate-bounce"></div>
      <div className="hidden sm:block absolute bottom-20 right-20 w-16 h-16 bg-yellow-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="hidden sm:block absolute top-1/2 left-1/4 w-12 h-12 bg-green-400 rounded-full blur-xl opacity-25 animate-ping"></div>

      <div className="relative w-full max-w-6xl flex flex-col lg:flex-row rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl mx-2 sm:mx-4">
        {/* Left Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-black/80 to-purple-900/90 p-8 lg:p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Mini Shop</h1>
            </div>

            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Welcome to Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Dream Store
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Discover exclusive collections and premium products tailored just for you.
            </p>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="lg:w-1/2 w-full bg-white/95 backdrop-blur-xl p-6 lg:p-10 flex flex-col justify-center relative">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h3>
              <p className="text-gray-600 text-base">Sign in to your luxury account</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center text-base">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600 text-base">
                  Don't have an account?{" "}
                  <span
                    onClick={() => navigate("/signup")}
                    className="text-purple-600 hover:text-purple-500 font-semibold cursor-pointer"
                  >
                    Sign up now
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

export default App;
