import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        style={{ color: "#1a1a1a" }}
        className={cn(
          "block w-full rounded-lg bg-[#e8f0fd] outline-0 focus-visible:outline-2 focus-visible:outline-orange-500  border  border-gray-300 p-2 sm:p-3",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
