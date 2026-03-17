const axios = require("axios");

async function generateScene(text) {
  try {
    const prompt = `
You are an AI that converts diary entries into structured scene data.

Extract the following information from the diary entry:

location: place where the event happens
time: morning / afternoon / evening / night
objects: list of visible objects in the scene
mood: emotional tone

Return STRICT JSON in this format:

{
 "location": "",
 "time": "",
 "objects": [],
 "mood": ""
}

Diary entry:
"${text}"
`;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "gemma:2b",
      prompt: prompt,
      stream: false
    });

    const sceneText = response.data.response;

    try {
        const sceneJSON = JSON.parse(sceneText);
        return sceneJSON;
    } catch (err) {
        console.log("Scene parse failed, returning raw text");
        return sceneText;
    }

  } catch (error) {
    console.error("AI Error:", error.message);
    return null;
  }
}

module.exports = generateScene;