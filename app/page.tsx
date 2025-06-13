import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import HomeRecipes from "@/components/home/HomeRecipes";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HomeRecipes />
      </main>
    </>
  );
}
