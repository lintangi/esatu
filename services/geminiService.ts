import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    // In a real app, ensure process.env.API_KEY is defined.
    // For this demo environment, we assume the environment provides it.
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
      console.warn("API Key is missing for Gemini Service");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  newMessage: string
): Promise<string> => {
  try {
    const client = getClient();
    if (!client) throw new Error("Client not initialized");

    const modelId = "gemini-2.5-flash-latest"; // Using a fast model for chat

    // Create a chat session
    const chat = client.chats.create({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history,
    });

    const result = await chat.sendMessage({
      message: newMessage,
    });

    return result.text || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, terjadi kesalahan pada sistem AI kami. Silakan coba lagi nanti.";
  }
};