import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `
Sen Kaiwen'in üst düzey Dijital Asistanısın. 

KRİTİK KURALLAR:
1. ASLA "gösterebilirim", "yapabilirim", "istersen gidebiliriz" gibi izin isteyen veya ucu açık cümleler kurma.
2. EYLEMİ YA DOĞRUDAN YAP YA DA BUTON SUN. 
3. Konuşurken "Seni oraya götürüyorum", "İşte projelerim", "İletişim bilgilerini aşağıda bulabilirsin" gibi net ve proaktif ol.
4. Cevapların kesinlikle en fazla 2 kısa cümle olmalı.

STRATEJİ:
- Bir sayfadan/bölümden bahsediyorsan MUTLAKA JSON aksiyonunu ekle.
- Kullanıcı bir şey sorduğunda hem cevap ver hem de otomatik olarak o aksiyonu tetikle.

SİTE MİMARİSİ:
- / (Ana Sayfa), /projects (Projeler).
- Detaylar: /project/campus-meal, /project/vision-journal.
- Bölümler: about (hakkında), app-content (içerik/özellikler), contact (iletişim).

JSON AKSİYONLARI:
- {"action": "navigate", "path": "/url"} -> Sayfa değişimi için.
- {"action": "scroll", "target": "target_id"} -> Sayfa içi kaydırma için.
- {"action": "options", "answerText": "Mesaj", "options": [{"id": "id", "label": "Label"}]} -> Seçenek sunmak için.
- {"action": "contact"} -> İletişim butonları için.
`;

const MODELS = [
  "gemini-2.5-flash-lite", // En ucuz ve hızlı
  "gemini-2.5-flash",      // Orta segment, yüksek kapasite
  "gemini-2.5-pro"         // En güçlü, son çare
];

export const askAI = async (query, context = "/", pageContent = "") => {
  let lastError = null;

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel(
        { model: modelName },
        { apiVersion: 'v1beta' }
      );
      
      const contextualPrompt = `
${SYSTEM_PROMPT}

KULLANICI BAĞLAMI:
- Şu an ${context} sayfasında.
- SAYFA İÇERİĞİ: ${pageContent.substring(0, 3000)}

GÖREV: Kullanıcı sayfa içeriğiyle ilgili soru sorarsa veya özet isterse yukarıdaki "SAYFA İÇERİĞİ" kısmına bakarak cevap ver.
`;
      
      const result = await model.generateContent([contextualPrompt, query]);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      let actionData = null;
      let cleanText = text;

      if (jsonMatch) {
        try {
          actionData = JSON.parse(jsonMatch[0]);
          cleanText = text.replace(/```json[\s\S]*?```/g, "").replace(/\{[\s\S]*\}/g, "").trim();
        } catch (e) {
          console.warn(`AI Action parse failed for model ${modelName}`);
        }
      }

      return { text: cleanText || "Nasıl yardımcı olabilirim?", actionData };

    } catch (error) {
      lastError = error;
      console.warn(`Model ${modelName} failed, trying next... Error:`, error.message);
      // Continue to next model in loop
    }
  }

  // If all models fail
  console.error("All AI models failed:", lastError);
  return { 
    text: "Şu an tüm zekalarım yoğunlukta, yerel komutları deneyebilirsiniz.", 
    actionData: null 
  };
};
