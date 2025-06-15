import "dotenv/config";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function describeTitle(title: string) {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `'${title}' describe this in 15 words`,
  });

  return result.text;
}
