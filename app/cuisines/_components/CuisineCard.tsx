import { SearchRecipe } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  recipe: SearchRecipe;
}

const CuisineCard = ({ recipe }: Props) => {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="rounded-2xl group h-52 overflow-hidden relative isolate"
    >
      <Image
        src={recipe?.image}
        loading="lazy"
        className="w-full will-change-transform h-[208px] md:group-hover:scale-105  group-hover:brightness-110  transition-all object-cover duration-300 "
        width={312}
        height={208}
        alt=""
      />
      <div
        style={{
          background:
            "linear-gradient(rgba(27, 30, 36, 0) 0%, rgba(27, 30, 36,.5) 90%)",
        }}
        className="bg-gradient-to-b  object-cover left-0 right-0 bottom-0 px-2 pb-2 flex items-end z-10 h-20 absolute "
      >
        <h4 className="text-base leading-5  font-medium text-white line-clamp-2">
          {recipe.title}
        </h4>
      </div>
    </Link>
  );
};
export default CuisineCard;
