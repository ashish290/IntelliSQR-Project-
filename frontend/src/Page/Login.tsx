import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must contain 8 length"),
});

type FormValues = z.infer<typeof schema>;
function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Login successful!");
      navigate("/logout");
      console.log("User Data:", data);
    },
    onError: (error) => {
      toast.error("Login failed! Check your credentials.");
      console.error("Login Error:", error);
    },
  });

  const Submit: SubmitHandler<FormValues> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      loginMutation.mutate(data);
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <div className="Login-container">
      <div className="Container">
        <div className="heading">Welcome back!</div>

        <form className="input" onSubmit={handleSubmit(Submit)}>
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
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="footer">
          <p>
            Don't have an account?
            <NavLink to="/signup" style={{ textDecoration: "none" }}>
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
