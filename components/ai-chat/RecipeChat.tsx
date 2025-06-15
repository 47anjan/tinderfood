"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { RecipeDetails } from "@/lib/types";
import { useChat } from "ai/react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FiCopy, FiSend, FiUser } from "react-icons/fi";
import { LuChefHat } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChefHat, Coffee, Sparkles } from "lucide-react";

interface ChatProps {
  recipe: RecipeDetails;
}

export default function RecipeChat({ recipe }: ChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  const systemPrompt = useMemo(() => {
    const prompt = `You are a professional chef assistant for the recipe "${
      recipe.title
    }". Use these comprehensive details to answer questions:

**Recipe Overview:**
- Cuisine: ${recipe.cuisines?.join(", ") || "Not specified"}
- Dietary: ${[
      ...(recipe.diets || []),
      recipe.vegetarian ? "Vegetarian" : null,
      recipe.vegan ? "Vegan" : null,
      recipe.glutenFree ? "Gluten-Free" : null,
    ]
      .filter(Boolean)
      .join(", ")}
- Cook Time: ${recipe.readyInMinutes} minutes
- Servings: ${recipe.servings}
- Price/Serving: $${(recipe.pricePerServing / 100).toFixed(2)}
- Likes: ${recipe.aggregateLikes}
- Health Score: ${recipe.healthScore}/100
- Dish Types: ${recipe.dishTypes?.join(", ") || "Not specified"}

**Ingredients (${recipe.extendedIngredients?.length} items):**
${recipe.extendedIngredients
  ?.map(
    (ing: any) =>
      `- ${ing.measures.metric.amount} ${ing.measures.metric.unitShort} ${ing.nameClean} (${ing.original})`
  )
  .join("\n")}

**Nutritional Info per Serving:**
${
  recipe.nutrition?.nutrients
    ?.filter((n: any) =>
      ["Calories", "Protein", "Fat", "Carbohydrates", "Fiber"].includes(n.name)
    )
    ?.map((n: any) => `- ${n.name}: ${Math.round(n.amount)}${n.unit}`)
    ?.join("\n") || "Not available"
}

**Cooking Instructions:**
${
  recipe.analyzedInstructions[0]?.steps
    ?.map(
      (step: any) =>
        `${step.number}. ${step.step.replace(/<\/?[^>]+(>|$)/g, "")}`
    )
    ?.join("\n\n") || "No instructions provided"
}

**Additional Details:**
- Equipment: ${
      recipe.analyzedInstructions[0]?.steps
        ?.flatMap((step: any) => step.equipment.map((e: any) => e.name))
        ?.filter((v: any, i: any, a: any) => a.indexOf(v) === i)
        ?.join(", ") || "Standard kitchen equipment"
    }
- Meal Types: ${recipe.occasions?.join(", ") || "Not specified"}

Provide precise, professional answers using metric measurements. When suggesting substitutions, consider dietary restrictions. Include pro tips for time/cost savings when relevant.`;

    return prompt;
  }, [recipe]);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      body: { systemPrompt: JSON.stringify(systemPrompt) },
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-gradient-to-r cursor-pointer from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
          <LuChefHat className="w-4 h-4 mr-2" />
          Ask Chef Steve
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-full sm:max-w-none p-0 flex flex-col h-full"
      >
        <ScrollArea className="h-full flex-1 bg-gradient-to-b from-slate-50 to-white   pb-[70px]">
          <div className="px-6 py-6 space-y-4">
            {messages.length === 0 && (
              <div className="relative min-h-[400px] bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-rose-500/5"></div>

                {/* Floating decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-orange-200/20 to-rose-200/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-20 right-16 w-24 h-24 bg-gradient-to-r from-rose-200/15 to-orange-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-16 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-300/10 to-rose-300/10 rounded-full blur-lg animate-pulse delay-500"></div>

                <div className="relative text-center py-10 px-4">
                  {/* Enhanced chef hat icon */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 blur-lg rounded-full"></div>
                      <div className="relative bg-gradient-to-r from-orange-100 to-rose-100 p-4 rounded-full border border-orange-200/50 shadow-xl">
                        <ChefHat className="h-10 w-10 text-orange-600" />
                      </div>
                    </div>
                    <Sparkles className="h-6 w-6 text-orange-500 animate-pulse" />
                  </div>

                  {/* Welcome heading */}
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                    <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                      Welcome to Chef Steve!
                    </span>
                  </h3>

                  {/* Subtitle */}
                  <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md mx-auto">
                    Your personal culinary assistant is ready to help you
                    discover amazing recipes and cooking tips.
                  </p>

                  {/* Feature highlights */}
                  <div className="bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/50 rounded-2xl p-6 max-w-lg mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <Coffee className="h-5 w-5 text-orange-500" />
                      <span className="font-medium text-slate-700">
                        I can help you with:
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 space-y-2 text-left">
                      <p className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>
                          Finding recipes based on ingredients you have
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-rose-400 mt-1">•</span>
                        <span>Cooking techniques and kitchen tips</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>Meal planning and dietary suggestions</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-rose-400 mt-1">•</span>
                        <span>Food pairing and flavor combinations</span>
                      </p>
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="mt-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100/50 to-rose-100/50 border border-orange-200/30 rounded-full px-4 py-2 text-sm text-slate-600">
                      <Sparkles className="h-4 w-4 text-orange-500" />
                      <span>
                        Start by asking me anything about this recipe!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[85%] ${
                    m.role === "user" ? "flex-row-reverse" : "flex-row"
                  } items-start gap-3`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback
                      className={
                        m.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gradient-to-br from-orange-400 to-red-500 text-white"
                      }
                    >
                      {m.role === "user" ? (
                        <FiUser className="w-4 h-4" />
                      ) : (
                        <LuChefHat className="w-4 h-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm min-w-0 ${
                      m.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white  border border-slate-200 "
                    }`}
                  >
                    <div className="flex justify-between items-center gap-3 mb-2">
                      <span
                        className={`text-xs font-medium flex-shrink-0 ${
                          m.role === "user"
                            ? "text-blue-100"
                            : "text-slate-600 "
                        }`}
                      >
                        {m.role === "user" ? "You" : "Chef Steve"}
                      </span>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span
                          className={`text-xs ${
                            m.role === "user"
                              ? "text-blue-100"
                              : "text-slate-500 "
                          }`}
                        >
                          {formatTime(new Date(m.createdAt || Date.now()))}
                        </span>
                        {m.role !== "user" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(m.content)}
                            className="h-6 w-6 text-slate-500 hover:text-slate-700  "
                            title="Copy to clipboard"
                          >
                            <FiCopy className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div
                      className={`prose prose-sm max-w-none break-words ${
                        m.role === "user" ? "prose-invert" : "prose-slate "
                      }`}
                    >
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0 break-words">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-2 last:mb-0 space-y-1">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-2 last:mb-0 space-y-1">
                              {children}
                            </ol>
                          ),
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 bg-gradient-to-br from-orange-400 to-red-500">
                    <AvatarFallback className="text-white">
                      <LuChefHat className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white  border border-slate-200  rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50  border border-red-200  rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700  font-medium">Error</span>
                </div>
                <p className="text-red-600  mt-1 text-sm break-words">
                  {error.message}
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Form - Fixed at bottom */}
        <div className="border-t border-gray-300 fixed bottom-0 w-full bg-white/80 backdrop-blur-sm p-4 shrink-0 h-[70px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) handleSubmit(e);
            }}
            className="flex gap-3"
          >
            <div className="flex-1 min-w-0">
              <Input
                autoFocus
                name="input"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about this recipe..."
                className="h-10 rounded-full bg-white  border-slate-300  focus:border-orange-500  focus:ring-orange-500/20 "
                aria-label="Ask a question about the recipe"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              className="h-10 rounded-full w-10 text-white flex-shrink-0 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={!input.trim() || isLoading}
            >
              <FiSend className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
