import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import './Style.css'
import { toast } from "react-toastify";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must contain 8 length"),
});

type FormValues = z.infer<typeof schema>;

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const signupMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await axios.post("http://localhost:3000/auth/signup", data);
      console.log("Response:", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Signup successful!");
      navigate("/logout");
      console.log("User Registered:", data);
    },
    onError: (error) => {
      toast.error("Signup failed! Try again.");
      console.error("Signup Error:", error);
    },
  });

  const Submit: SubmitHandler<FormValues> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      signupMutation.mutate(data);
      
    } catch (error) {
      console.log("Login error", error);
    }
  };
  return (
    <div className="signup-container">
      <div className="Container">
        <div className="heading">Welcome back!</div>

        <form className="input" onSubmit={handleSubmit(Submit)}>
          <input
            type="text"
            id="name"
            placeholder="Name"
          />
          <input
            type="email"
            id="email"
            placeholder="UID"
            {...register("email")}
          />
          {errors.email && (
            <div style={{ color: "red", fontSize: "14px" }}>
              {errors.email?.message}
            </div>
          )}
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <div style={{ color: "red", fontSize: "14px" }}>
              {errors.password?.message}
            </div>
          )}
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "SignUp"}
          </button>
        </form>
        <div className="footer">
          <p>
            Don't have an account?
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
