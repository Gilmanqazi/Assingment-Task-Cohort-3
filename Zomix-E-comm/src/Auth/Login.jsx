import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';




const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    const success = loginUser(data.email, data.password);
    if (success) {
      navigate("/");
 toast.success("Login Successfull")
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-black flex justify-center items-center p-4 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* MINI CARD */}
      <div className="w-full max-w-xs sm:max-w-sm bg-white rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/50 border border-zinc-100 relative overflow-hidden">
        
        {/* Subtle Decorative Glow */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-zinc-900">
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 400 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="rounded-lg shadow-sm"
            >
              <rect width="400" height="400" rx="80" fill="#18181B"/>
              <path d="M110 130H290L110 270H290" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="290" cy="130" r="18" fill="#2563EB"/>
            </svg>
            <span>ZOMIX<span className="text-blue-600">.</span></span>
          </Link>
        </div>

        {/* HEADER TEXT */}
        <div className="text-center mb-5">
          <h2 className="text-base font-bold text-zinc-900">Welcome back</h2>
          <p className="text-zinc-500 text-xs mt-0.5">Sign in to your ZOMIX account</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          
          {/* EMAIL FIELD */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address"
                }
              })}
              className={`w-full px-3 py-2 bg-zinc-50 border text-zinc-900 text-xs rounded-lg focus:bg-white focus:outline-none transition-all ${
                errors.email ? 'border-rose-500' : 'border-zinc-200 focus:border-blue-600'
              }`}
            />
            {errors.email && <p className="text-rose-500 text-[10px] mt-0.5 font-medium">{errors.email.message}</p>}
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required"
                })}
                className={`w-full px-3 py-2 bg-zinc-50 border text-zinc-900 text-xs rounded-lg pr-10 focus:bg-white focus:outline-none transition-all ${
                  errors.password ? 'border-rose-500' : 'border-zinc-200 focus:border-blue-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-zinc-400 hover:text-zinc-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-rose-500 text-[10px] mt-0.5 font-medium">{errors.password.message}</p>}
          </div>

          {/* FORGOT PASSWORD LINK */}
          <div className="flex justify-end pt-0.5">
            <a href="#forgot" className="text-[10px] font-semibold text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-zinc-900/10 text-xs flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Sign In</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>

        {/* SWITCH TO REGISTER */}
        <p className="text-center text-xs text-zinc-500 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;