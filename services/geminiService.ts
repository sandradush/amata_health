
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getSymptomAnalysis = async (symptoms: string) => {
  if (!API_KEY) return "API Key not configured.";
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Acting as a preliminary medical triage assistant for the Rwandan context, analyze these symptoms: ${symptoms}. 
    Provide a structured summary of possible causes (non-diagnostic), urgency level, and suggested specialist to consult. 
    Keep it concise and empathetic. Respond in English but mention if some terms have Kinyarwanda equivalents.`,
  });
  return response.text;
};

export const getMedicationExplanation = async (prescription: string) => {
  if (!API_KEY) return "API Key not configured.";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain this medication to a patient: ${prescription}. 
    Focus on common usage, simple instructions, and key side effects to watch for. 
    Use very simple language.`,
  });
  return response.text;
};

// Functions for decoding/encoding audio for Live API
export const decodeBase64 = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const encodeBase64 = (bytes: Uint8Array) => {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
