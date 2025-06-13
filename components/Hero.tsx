import Image from "next/image";

import Link from "next/link";

const Hero = () => {
  return (
    <section className=" pt-2 px-4 sm:px-10 md:px-[74px] w-full  ">
      <div className="relative isolate">
        <Image
          src={"/food.webp"}
          width={1600}
          height={900}
          alt=""
          className="h-[450px] w-full object-cover rounded-3xl "
        />
        <div className="absolute inset-0 text-white flex items-center justify-center flex-col bg-opacity-50 text-center px-4 rounded-3xl mt-10">
          <h1 className="text-3xl sm:text-4xl md:mb-4 font-extrabold md:text-5xl">
            Discover Your Next Favorite Meal
          </h1>
          <h3 className="text-white/90 lg:text-lg mb-6">
            Explore thousands of recipes tailored to your taste and lifestyle.
          </h3>
          <Link href="/cuisines?country=indian">Try New Cuisines</Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;
