"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import auth from "@/apis/auth.api";
import { User } from "@/types/user.type";
import { path } from "@/constants/paths";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export interface RegistryData {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
}

// interface RegistryResponse {
//   message: string;
//   statusCode: any;
//   data: {
//     accessToken: string;
//     refreshToken: string;
//     user: User;
//   };
// }

interface RegistryResponse {
  message: string;
  expires_in: string;
}


const RegistryPage: React.FC = () => {
  const [formData, setFormData] = useState<RegistryData>({
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");

    try {

      const response = await auth.registerAccount(formData);
      

      const data: RegistryResponse = await response.data;


      if (response.status === 200) {
        console.log("data", data);
        // Handle successful Registry
        toast.success(data.message);

        // Store token if provided
        // if (data.data && data.data.accessToken) {
        //   localStorage.setItem("access_token", data.data.accessToken);
        // }

        // Redirect or update app state here
        toast.success(
          "Registration successful, please login to use the service"
        );
        router.push(path.verifyotp + `?email=${formData.email}`);
      } else {
        setError(data.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (err: any) {
      let errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        errorMessage = Array.isArray(err.response.data.message)
          ? err.response.data.message[0]
          : err.response.data.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegistry = () => {
    // Implement Google Registry logic here
    console.log("Google Registry clicked");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-500 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-400 rounded-full opacity-80"></div>
        <div className="absolute top-32 right-20 w-12 h-12 bg-pink-400 rounded-full opacity-70"></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 bg-orange-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-green-300 rounded-full opacity-50"></div>

        {/* Decorative lines */}
        <div className="absolute top-20 right-40 w-16 h-0.5 bg-white opacity-30 rotate-45"></div>
        <div className="absolute top-40 left-32 w-12 h-0.5 bg-white opacity-30 rotate-12"></div>
        <div className="absolute bottom-40 right-16 w-20 h-0.5 bg-white opacity-30 -rotate-12"></div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center w-full p-8 text-center">
          {/* Skeleton Character */}
          <div className="mb-8 relative">
            {/* Speech bubbles */}
            <div className="absolute -top-16 -left-20 bg-purple-800 text-white px-4 py-2 rounded-lg text-sm">
              ••••••
            </div>
            <div className="absolute -top-16 right-0 bg-purple-800 text-white px-4 py-2 rounded-lg text-sm">
              ••••••••
            </div>

            {/* Skeleton body */}
          </div>

          {/* Text */}
          <h2 className="text-2xl font-bold text-purple-800 mb-2">
            Not just learning English, but enjoying the journey
          </h2>
          <p className="text-purple-700 text-lg">One Chill Session At A Time</p>
        </div>
      </div>

      {/* Right Side - Registry Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Registry to your Account
            </h1>

            {/* Google Registry Button */}
            <button
              onClick={handleGoogleRegistry}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg mb-4 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Registry Form */}
            {/* Registry Form */}
            <div className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Đang đăng ký..." : "Registry"}
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              You already have an account?{" "}
              <a
                href={path.login}
                className="text-green-600 hover:text-green-500 font-medium"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryPage;
