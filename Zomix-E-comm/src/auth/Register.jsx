import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ mode: 'onChange' });

  const passwordValue = watch('password', '');

  // Password Strength Logic
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-zinc-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
      case 2:
        return { score: 33, label: 'Weak', color: 'bg-rose-500', textColor: 'text-rose-500' };
      case 3:
        return { score: 66, label: 'Medium', color: 'bg-amber-500', textColor: 'text-amber-500' };
      case 4:
        return { score: 100, label: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-500' };
      default:
        return { score: 0, label: '', color: 'bg-zinc-200' };
    }
  };

  const strength = getPasswordStrength(passwordValue);

  const onSubmit = (data) => {
    const success = registerUser(data.name, data.email, data.password);
    if (success) navigate('/', { replace: true });
  };

  return (
    /* MAIN CONTAINER: Top margin/padding add kar di hai (pt-20 / pt-24) taaki Navbar se space bane */
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-900 via-zinc-900 to-black flex flex-col justify-center items-center px-4 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-12 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* RESPONSIVE MINI CARD CONTAINER (Height aur Padding Compact hai) */}
      <div className="w-full max-w-[340px] sm:max-w-sm bg-white rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/50 border border-zinc-100 relative overflow-hidden my-auto">
        
        {/* Subtle Decorative Glow */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* LOGO */}
        <div className="flex justify-center mb-2 sm:mb-3">
          <Link to="/" className="flex items-center gap-2 text-base sm:text-lg font-black tracking-tight text-zinc-900">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 400 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="rounded-lg shadow-sm sm:w-6 sm:h-6"
            >
              <rect width="400" height="400" rx="80" fill="#18181B"/>
              <path d="M110 130H290L110 270H290" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="290" cy="130" r="18" fill="#2563EB"/>
            </svg>
            <span>ZOMIX<span className="text-blue-600">.</span></span>
          </Link>
        </div>

        {/* HEADER TEXT */}
        <div className="text-center mb-2.5 sm:mb-3">
          <h2 className="text-xs sm:text-sm font-bold text-zinc-900">Create an account</h2>
          <p className="text-zinc-500 text-[10px] sm:text-[11px] mt-0.5">Join ZOMIX today</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 sm:space-y-2.5">
          
          {/* FULL NAME FIELD */}
          <div>
            <label className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-2.5 py-1.5 bg-zinc-50 border text-zinc-900 text-xs rounded-lg focus:bg-white focus:outline-none transition-all ${
                errors.name ? 'border-rose-500' : 'border-zinc-200 focus:border-blue-600'
              }`}
            />
            {errors.name && <p className="text-rose-500 text-[9px] mt-0.5 font-medium">{errors.name.message}</p>}
          </div>

          {/* EMAIL FIELD */}
          <div>
            <label className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="YourEmail@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Invalid email"
                }
              })}
              className={`w-full px-2.5 py-1.5 bg-zinc-50 border text-zinc-900 text-xs rounded-lg focus:bg-white focus:outline-none transition-all ${
                errors.email ? 'border-rose-500' : 'border-zinc-200 focus:border-blue-600'
              }`}
            />
            {errors.email && <p className="text-rose-500 text-[9px] mt-0.5 font-medium">{errors.email.message}</p>}
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Min 6 characters required"
                  }
                })}
                className={`w-full px-2.5 py-1.5 bg-zinc-50 border text-zinc-900 text-xs rounded-lg pr-10 focus:bg-white focus:outline-none transition-all ${
                  errors.password ? 'border-rose-500' : 'border-zinc-200 focus:border-blue-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-1 text-[9px] font-semibold text-zinc-400 hover:text-zinc-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-rose-500 text-[9px] mt-0.5 font-medium">{errors.password.message}</p>}

            {/* LIVE STRENGTH METER */}
            {passwordValue && (
              <div className="mt-1 bg-zinc-50 p-1.5 rounded-md border border-zinc-100">
                <div className="flex justify-between items-center text-[9px] mb-0.5">
                  <span className="text-zinc-400">Strength:</span>
                  <span className={`font-bold ${strength.textColor}`}>{strength.label}</span>
                </div>
                <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.score}%` }}></div>
                </div>
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "Please confirm password",
                  validate: (value) => value === passwordValue || "Passwords do not match"
                })}
                className={`w-full px-2.5 py-1.5 bg-zinc-50 border text-zinc-900 text-xs rounded-lg pr-10 focus:bg-white focus:outline-none transition-all ${
                  errors.confirmPassword ? 'border-rose-500' : 'border-zinc-200 focus:border-blue-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-1 text-[9px] font-semibold text-zinc-400 hover:text-zinc-700"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-rose-500 text-[9px] mt-0.5 font-medium">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] text-white font-semibold py-2 rounded-xl transition-all shadow-md shadow-zinc-900/10 text-xs flex items-center justify-center gap-1.5 mt-2.5"
          >
            <span>Create Account</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>

        {/* SWITCH TO LOGIN */}
        <p className="text-center text-[10px] sm:text-[11px] text-zinc-500 mt-2.5">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;