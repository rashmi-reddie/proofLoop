const fs = require("fs");
const {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeImage = async (imagePath, context) => {
  const imageBuffer = fs.readFileSync(imagePath);

  const prompt = `
   You are an evidence analysis assistant for ProofLoop.
   
   Your job is to determine whether the uploaded evidence is consistent with the user's claimed daily practice.
   
   IMPORTANT:
   - Do Not claim that the image proves the user personally performed the activity.
   - Do Not claim that the image proves when the activity happened.
   - Do Not claim that the image proves how long the activity lasted.
   - Judge only what can reasonably be inferred from the visible evidence.
   
   USER CONTEXT:
   ${context}
   
   Analyze both the visual and audio information.

Return ONLY a JSON object.

The response MUST start with {
and MUST end with }.

Do not wrap the JSON in markdown.
Do not use \`\`\`json.
Do not write anything before or after the JSON.

The JSON MUST have exactly this structure:
   
   
   {
    "status":"consistent | partially_consistent | unclear | inconsistent",
    "confidence":0,
    "activityMatch": true,
    "durationMatch": true,
    "observedActivity": "What activity the evidence appears to show",
    "observedDuration": "Observed duration if it can be determined, otherwise null",
    "summary": "Brief explanation of what the evidence shows and how it relates to the claim.",
    "limitations":[
    "Important limitation of the evidence"
     ]   
    }
     


Rules:

- "consistent" =
  The evidence appears to show the claimed activity
  and is reasonably consistent with the claimed amount/duration.

- "partially_consistent" =
  The evidence appears to show the claimed activity,
  but there is a meaningful mismatch or insufficient evidence
  regarding duration/quantity.

- "unclear" =
  The evidence cannot confidently establish whether
  the claimed activity occurred.

- "inconsistent" =
  The evidence appears unrelated to the claimed activity.

- activityMatch must be true only when the evidence appears
  relevant to the claimed activity.

- durationMatch must be true only when the evidence provides
  reasonable support for the claimed duration/quantity.

  - activityMatch and durationMatch MUST be evaluated independently.

- Set activityMatch to true if the evidence shows the claimed
  activity, even if the amount or duration is insufficient.

- Set durationMatch to false when the evidence shows the claimed
  activity but the observed duration/quantity is less than claimed.

- If activityMatch is true and durationMatch is false,
  the overall status MUST be "partially_consistent".

- Do NOT mark the activity as inconsistent merely because
  the duration is shorter than the claim.
- Never claim that evidence proves who performed the activity.
- Never claim that evidence proves the exact time it occurred.
- Do not assume missing information.
- confidence must be between 0 and 1.
- Return ONLY valid JSON.
 
   
    `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBuffer.toString("base64"),
        },
      },
      {
        text: prompt,
      },
    ],
  });

  const rawResult = response.text.trim();

  let result;

  try {
    result = JSON.parse(rawResult);
  } catch (error) {
    console.error("AI JSON PARSE ERROR:", rawResult);
    throw new Error("AI returned an invalid verification response");
  }

  return result;
};

const analyzeVideo = async (videoPath, context, mimeType) => {
  let video = await ai.files.upload({
    file: videoPath,
    config: {
      mimeType,
    },
  });

  console.log("UPLOADED FILE:", video);

  while (!video.state || video.state.toString() !== "ACTIVE") {
    console.log("VIDEO IS STILL PROCESSING...");
    console.log("VIDEO STATE:", video.state);

    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    video = await ai.files.get({
      name: video.name,
    });
  }

  console.log("VIDEO IS ACTIVE:", video);

  const prompt = `
    You are an evidence analysis assistant for ProofLoop.

    Your job is to determine whether the uploaded video is consistent with the user's claimed daily practice.

    IMPORTANT:
    - Do NOT claim that the video proves the user personally performed the activity.
    - Do NOT claim that the video proves exactly when the activity happened.
    - Do NOT claim that the video proves the exact duration of the activity.
    - Judge only what can reasonably be inferred from the video.

    USER CONTEXT:
    ${context}

    Analyze both the visual and audio information in the video.

    Return ONLY valid JSON in exactly this format:

{
    "status":"consistent | unclear | inconsistent",
    "confidence":0,
    "summary":"Brief explanation of what the video shows and how it relates to the claim.",
    "limitations":[
      "Important limitation of the evidence"
    ]
}
Rules:
- "consistent" = the video appears relevant to the claimed activity.
- "unclear" = the video may be relevant, but there is not enough evidence.
- "inconsistent" = the video appears unrelated to the claimed activity.
- confidence must be a number between 0 and 1.
- Do not include markdown.  
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: createUserContent([
      createPartFromUri(video.uri, video.mimeType),
      prompt,
    ]),
  });

  const rawResult = response.text.trim();

  let result;

  try {
    result = JSON.parse(rawResult);
  } catch (error) {
    console.error("AI VIDEO JSON PARSE ERROR:", rawResult);
    throw new Error("AI returned an invalid video verification response");
  }
  if (result.activityMatch === true && result.durationMatch === false) {
    result.status = "partially_consistent";
  }

  if (result.activityMatch === true && result.durationMatch === true) {
    result.status = "consistent";
  }

  if (result.activityMatch === false) {
    result.status = "inconsistent";
  }

  return result;
};

module.exports = {
  analyzeImage,
  analyzeVideo,
};
