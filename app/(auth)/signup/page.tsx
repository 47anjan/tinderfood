import Image from "next/image";
import UserSignupForm from "./user-signup-form";
import { ScrollArea } from "@/components/ui/scroll-area";
const SignUpPage = () => {
  return (
    <div className="flex">
      {/* Left side with illustration */}
      <div className="hidden h-screen  lg:flex lg:w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <div className="mb-8">
            <Image
              src="/signup.png"
              alt="Login illustration"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">Maecenas mattis egestas</h2>
          <p className="text-orange-100 leading-relaxed">
            Eidum et malesuada fames ac ante ipsum primis in faucibus
            suspendisse porta
          </p>
        </div>
      </div>

      {/* Right side with login form */}
      <ScrollArea className="w-full h-screen lg:w-1/2">
        <div className="w-full  flex items-center justify-center p-8">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-orange-600 mb-2">
                Tinderood
              </h1>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            <UserSignupForm />

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
export default SignUpPage;
