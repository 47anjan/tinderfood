"use client";

import { useAuth } from "@/contexts/auth-provider";
import { BASE_URL } from "@/lib/constants";
import { SaveRecipe } from "@/lib/types";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";

interface Props {
  recipe: SaveRecipe;
}

const ButtonSaveRecipe = ({ recipe }: Props) => {
  const { user, loading } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const saveRecipe = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/favorite/recipe/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...recipe,
          id: String(recipe.id),
        }),
        credentials: "include",
      });

      await response.json();

      if (response.ok) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsSaved(false);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const removeRecipe = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/favorite/recipe/remove/${recipe.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      await response.json();

      if (response.ok) {
        setIsSaved(false);
      } else {
        setIsSaved(true);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsSaved(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getSaved = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/favorite/recipe/${recipe.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        await response.json();

        if (response.ok) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      } catch (error) {
        console.log(error);
        setIsSaved(false);
      }
    };

    getSaved();
  }, []);

  return (
    user &&
    !loading && (
      <button className="flex cursor-pointer items-center gap-2 bg-white backdrop-blur-sm p-2  rounded-full border border-rose-200/50  ">
        {isLoading ? (
          <LuLoaderCircle className="h-5 translate-y-[1px] animate-spin w-5 text-rose-500 " />
        ) : (
          <div>
            {" "}
            {isSaved ? (
              <Heart
                onClick={removeRecipe}
                className="h-5 translate-y-[1px] fill-rose-500 w-5 text-rose-500 "
              />
            ) : (
              <Heart
                onClick={saveRecipe}
                className="h-5 translate-y-[1px] w-5 text-rose-500 "
              />
            )}{" "}
          </div>
        )}
      </button>
    )
  );
};
export default ButtonSaveRecipe;
