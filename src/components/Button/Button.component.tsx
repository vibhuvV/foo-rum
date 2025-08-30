import type { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 cursor-pointer text-sm font-light",
  {
    variants: {
      variant: {
        default: "p-3 rounded-xl",
        link: "font-medium hover:underline p-2 rounded-xl",
        icon: "hover:bg-neutral-200/80 p-2 rounded-md",
      },
      color: {
        primary: "bg-indigo-500 text-white",
        transparent: "bg-transparent text-black",
        danger: "bg-red-200 text-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "primary",
    },
  },
);

type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    endIcon?: ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  };

const Button: FC<ButtonProps> = ({
  endIcon,
  children,
  className,
  variant,
  color,
  type = "button",
  disabled = false,
  ...rest
}) => {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={cn(
        buttonVariants({ variant, color, className }),
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <span>{children}</span> {endIcon}
    </button>
  );
};

export default Button;
