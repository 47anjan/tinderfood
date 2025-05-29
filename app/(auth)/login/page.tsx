"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-provider";

// Zod schema for login form
const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .transform((str) => str.toLowerCase()),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({
    isLoading: false,
    error: "",
    success: false,
  });

  const { login } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setStatus({ isLoading: true, error: "", success: false });

      await login(data);
      setStatus({
        isLoading: false,
        error: "",
        success: true,
      });
    } catch (error) {
      console.error("Login error:", error);
      setStatus({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        success: false,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  disabled={status.isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    disabled={status.isLoading}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={status.isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {status.error && (
          <div className="p-3 bg-red-50 border flex items-center justify-center border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{status.error}</p>
          </div>
        )}

        {status.success && (
          <div className="p-3 bg-green-50 flex items-center justify-center border border-green-200 rounded-md">
            <p className="text-green-600 text-sm">
              Login successful! Redirecting...
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || status.isLoading}
          className={`w-full h-[50px] cursor-pointer transition-all duration-200 bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          Sign In
        </Button>

        {/* Forgot Password Link */}
        <div className="text-center">
          <a
            href="/forgot-password"
            className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
      </form>
    </Form>
  );
};

const LoginPage = () => {
  return (
    <div className="h-screen flex">
      {/* Left side with illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <div className="mb-8">
            <Image
              src="/login.png"
              alt="Login illustration"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome to TinderFood</h2>
          <p className="text-orange-100 leading-relaxed">
            Discover amazing recipes, connect with fellow food lovers, and share
            your culinary adventures
          </p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-orange-600 mb-2">
              TinderFood
            </h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
