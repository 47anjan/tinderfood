import Image from "next/image";
import UserSignupForm from "./user-signup-form";

const SignUpPage = () => {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* Left side with illustration */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-[#B5CCBE] text-white">
        <div className="max-w-md mx-auto text-center space-y-6">
          <Image
            src="/signup.png"
            alt="Decorative bird illustration"
            width={500}
            height={500}
            className="mx-auto"
          />
          <h2 className="text-2xl font-medium">Maecenas mattis egestas</h2>
          <p className="text-sm text-white/80">
            Eidum et malesuada fames ac ante ipsum primis in faucibus
            suspendisse porta
          </p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-3xl px-5 space-y-8">
          <div className="text-center lg:hidden">
            <h1 className="text-2xl font-script mb-6">Chatbirds</h1>
            <h2 className="text-xl text-gray-600">Welcome to Chatbirds</h2>
          </div>

          <div>
            <UserSignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
