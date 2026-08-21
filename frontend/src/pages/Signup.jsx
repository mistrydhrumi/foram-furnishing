import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


function Signup() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = async (e) => {
  e.preventDefault();

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Empty field validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    toast.error("All fields are required");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  // Strong password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!passwordRegex.test(password)) {
    toast.error(
      "Password must contain 8 characters, uppercase, lowercase, number and special character"
    );
    return;
  }

  // Password match validation
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      `http://localhost:8000/api/v1/user/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.success) {
      navigate("/verify");
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Server connection failed");
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

            <h3 className="font-semibold mb-2 text-lg">
              Foram Furnishing
            </h3>

            <h2 className="text-2xl font-bold mb-2">
              Elevate your living space
            </h2>

            <p className="text-sm text-gray-200 max-w-xs">
              Join our community to access exclusive collections
              and interior design consultations.
            </p>

          </div>

        </div>

        {/* SIGNUP FORM */}
        <div className="p-10">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create your account
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Enter your details to start your journey.
          </p>

          <form onSubmit={submitHandler} className="space-y-4">

            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="w-full border p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="w-full border p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="m@gmail.com"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />

            {/* Password */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full border p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

            {/* Confirm Password */}
            <div className="relative">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={handleChange}
                className="w-full border p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />

              <span
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-3 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading? <><Loader2 className="h-4 w-4 animate-spin mr-2"/>Please wait</>:'Create Account'}
            </button>

          </form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?
            <a href="/login" className="text-blue-600 ml-1">
              Login
            </a>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;