import Button from "@/components/Button";
import Card from "@/components/Card";
import { LogInIcon } from "lucide-react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { notImplemented } from "@/lib/utils";

type RegisterFormProps = {
  onSignInRedirect: () => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ onSignInRedirect }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async () => {
    try {
      notImplemented();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Card
      cardContainerClassName="min-w-[420px]"
      captionContent={
        <p className="text-xs text-center py-2">
          <span className="font-light">Already have an account?</span>{" "}
          <a
            className="text-indigo-500 font-font-medium cursor-pointer"
            onClick={onSignInRedirect}
          >
            Sign In
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
            <h4 className="font-bold">Create an account to continue</h4>
            <small className="text-xs text-neutral-500 font-light">
              Create an account to access all the features on this app
            </small>
          </div>
        </div>
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
          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium text-xs">Repeat Password</label>
            <input
              {...register("confirmPassword")}
              className={`bg-neutral-100 p-3 rounded-lg text-xs font-light ${
                errors.confirmPassword ? "border border-red-500" : ""
              }`}
              type="password"
              placeholder="Enter your password again"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs font-light">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default RegisterForm;
