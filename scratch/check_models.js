import { GoogleGenAI } from '@google/genai';

const apiKey = "AIzaSyD0H08UJB2s85TLzD3JkQCaZdlQZMKwlmo";
const client = new GoogleGenAI({ apiKey });

async function listModels() {
  try {
    const response = await client.models.list();
    if (response.pageInternal) {
      console.log("Models in pageInternal:");
      response.pageInternal.forEach(m => {
        console.log(`- ${m.name}`);
      });
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

listModels();
