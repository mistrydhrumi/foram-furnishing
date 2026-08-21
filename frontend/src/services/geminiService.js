import { GoogleGenAI } from "@google/genai";

let geminiChat = null;

function getChatInstance() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY is missing from environment variables.");
    return null;
  }
  if (!geminiChat) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      geminiChat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: `You are Studio Assistant, a helper for an interior design website.
Help users with room styling ideas, color palettes, furniture pairings, materials, lighting, layout advice, and mood directions.
Keep replies very short, maximum 2-3 sentences. Be direct and practical.
Never use markdown formatting like **, *, #, or bullet points. Write in plain sentences only.`,
        },
      });
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI:", err);
      return null;
    }
  }
  return geminiChat;
}

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // remove **bold**
    .replace(/\*(.*?)\*/g, '$1')       // remove *italic*
    .replace(/^#+\s/gm, '')            // remove # headings
    .replace(/^\*\s/gm, '')            // remove * bullet points
    .replace(/^-\s/gm, '')             // remove - bullet points
    .trim();
}

export async function getGeminiResponse(message) {
  try {
    const chat = getChatInstance();
    if (!chat) {
      return "Design assistant is currently offline. Please set VITE_GEMINI_API_KEY in environment variables.";
    }
    const response = await chat.sendMessage({ message });
    const rawText = response.text || "I'm sorry, I couldn't process that request.";
    return stripMarkdown(rawText);
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm experiencing some technical difficulties. Please try again later.";
  }
}