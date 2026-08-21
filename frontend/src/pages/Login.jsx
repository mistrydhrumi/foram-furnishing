import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.success) {
        navigate("/");
        dispatch(setUser(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-6">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-3xl w-full grid md:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
            alt="interior"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute bottom-10 left-8 text-white">
            <h3 className="font-semibold mb-2 text-lg">Foram Furnishing</h3>

            <h2 className="text-2xl font-bold mb-2">
              Elevate your living space
            </h2>

            <p className="text-sm text-gray-200 max-w-xs">
              Join our community to access exclusive collections and interior
              design consultations.
            </p>
          </div>
        </div>

        {/* LOGIN FORM */}
        <div className="p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Login to your account
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Enter your email and password.
          </p>

          <form onSubmit={submitHandler} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="m@gmail.com"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {/* FORGOT PASSWORD */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >Forgot Password?</Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Don't have an account?
            <a href="/signup" className="text-blue-600 ml-1">
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
