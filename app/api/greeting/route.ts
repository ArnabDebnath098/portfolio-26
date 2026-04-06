import { NextRequest } from "next/server";
import { buildGreetingPrompt, getTimeContext } from "@/lib/ai";

export const dynamic = "force-dynamic";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export async function GET(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === "your_groq_api_key_here") {
    return Response.json({ greeting: "Welcome. Arnab is glad you're here." });
  }

  const hourParam = req.nextUrl.searchParams.get("hour");
  const hour = hourParam ? parseInt(hourParam, 10) : 12;
  const seed = req.nextUrl.searchParams.get("seed") ?? "";
  const timeContext = getTimeContext(hour);

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: buildGreetingPrompt(timeContext, seed) }],
      temperature: 1.1,
      max_tokens: 40,
    }),
  });

  if (!response.ok) {
    return Response.json({ greeting: "Welcome. Arnab is glad you're here." });
  }

  const data = await response.json();
  const greeting = data.choices?.[0]?.message?.content?.trim() ?? "Welcome. Arnab is glad you're here.";

  return Response.json({ greeting }, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Pragma": "no-cache",
    },
  });
}
