import {useAuth} from "../../hook/useAuth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const RegisterPage = () => {

  const navigate = useNavigate()

  const {register:registerUser, error } = useAuth()


const {register,handleSubmit,watch,reset,formState:{errors,isSubmitting}} = useForm({
  defaultValues:{
    role:"users"
  }
})

const selectRole = watch("role")

const onSubmit = async(data)=>{
 try {
  await registerUser(data).unwrap()
  reset()
  navigate("/")
toast.success(`Welcome ${data.name}`)
 } catch (error) {
  console.log("Registration Failed",error)
 }
}



 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Register your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
             {...register("name",{
              required:"Name is Required"
             })
             }
              placeholder="Enter your name"
              className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2"
              required
            />
             {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              {...register("email",{
                required:"Email is Required"
               })
               }
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2"
              required
            />
             {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

       
         {/* Password */}
<div>
  <label className="block mb-1 font-medium">
    Password
  </label>

  <input
    type="password"
    placeholder="Enter your password"
    {...register("password", {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    })}
    className="w-full border rounded-lg px-4 py-2.5 outline-none"
  />

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">
      {errors.password.message}
    </p>
  )}
</div>

{/* Confirm Password */}
<div>
  <label className="block mb-1 font-medium">
    Confirm Password
  </label>

  <input
    type="password"
    placeholder="Confirm your password"
    {...register("confirmPassword", {
      required: "Please confirm your password",
      validate: (value, formValues) =>
        value === formValues.password || "Passwords do not match",
    })}
    className="w-full border rounded-lg px-4 py-2.5 outline-none"
  />

  {errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">
      {errors.confirmPassword.message}
    </p>
  )}
</div>

          {/* Role Switch */}
          <div>
            <label className="block mb-2 font-medium">
              Register as
            </label>

            <div className="flex bg-gray-100 rounded-lg p-1">
           <label  className={`w-1/2 text-center py-2 rounded-md cursor-pointer ${
            selectRole === "user"
            ? "bg-black text-white"
            : "text-gray-600"
           }`}>

              <input type="radio" value="user" {...register("role")} className="hidden" />
              User

           </label>

           <label  className={`w-1/2 text-center py-2 rounded-md cursor-pointer ${
            selectRole === "seller"
            ? "bg-black text-white"
            : "text-gray-600"
           }`}>

              <input type="radio" value="seller" {...register("role")} className="hidden" />
              Seller

           </label>
           
            </div>
          </div>

       
         {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-black font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;