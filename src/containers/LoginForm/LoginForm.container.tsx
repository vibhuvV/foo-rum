import Button from "@/components/Button";
import Card from "@/components/Card";
import { CircleXIcon, LogInIcon } from "lucide-react";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import useAuth from "@/hooks/useAuth";
import { ALLOWED_USERS } from "@/lib/constants";

type LoginFormProps = {
  onSignUpRedirect: () => void;
  onSignIn?: () => void;
};

const LoginForm: FC<LoginFormProps> = ({ onSignUpRedirect, onSignIn }) => {
  const { handleLogin } = useAuth();
  const [incorrectEmailPasswordError, setIncorrectEmailPasswordError] =
    useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = ALLOWED_USERS.find(
        (user) =>
          user.email === data.emailOrUsername &&
          user.password === data.password,
      );
      if (user) {
        handleLogin(user);
        onSignIn?.();
      } else {
        setIncorrectEmailPasswordError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Card
      cardContainerClassName="min-w-[420px]"
      captionContent={
        <p className="text-xs text-center py-2">
          <span className="font-light">Do not have an account?</span>{" "}
          <a
            className="text-indigo-500 font-font-medium cursor-pointer"
            onClick={onSignUpRedirect}
          >
            Sign Up
          </a>
        </p>
      }
    >
      <div className="flex flex-col items-center justify-center gap-12 py-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <span className="inline-block p-3 bg-neutral-100 rounded-full">
            <LogInIcon className="w-5 h-5" />
          </span>
          <div className="flex flex-col items-center justify-center">
            <h4 className="font-bold">Sign in to continue</h4>
            <small className="text-xs text-neutral-500 font-light">
              Sign in to access all the features on this app
            </small>
          </div>
        </div>
        {incorrectEmailPasswordError && (
          <div className="text-red-500 bg-red-100 border border-red-500 w-full flex items-center gap-2 p-2 rounded-md">
            <CircleXIcon className="w-4 h-4" />
            <p>Incorrect email or password</p>
          </div>
        )}
        <form
          className="w-full max-w-[320px] flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium text-xs">Email or username</label>
            <input
              {...register("emailOrUsername")}
              className={`bg-neutral-100 p-3 rounded-lg text-xs font-light ${
                errors.emailOrUsername ? "border border-red-500" : ""
              }`}
              type="text"
              placeholder="Enter your email or username"
            />
            {errors.emailOrUsername && (
              <span className="text-red-500 text-xs font-light">
                {errors.emailOrUsername.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium text-xs">Password</label>
            <input
              {...register("password")}
              className={`bg-neutral-100 p-3 rounded-lg text-xs font-light ${
                errors.password ? "border border-red-500" : ""
              }`}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500 text-xs font-light">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default LoginForm;
