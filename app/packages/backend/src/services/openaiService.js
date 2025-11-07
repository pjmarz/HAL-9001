const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Analyze a bottle image using OpenAI Vision API
 * @param {string|Buffer} imagePath - Path to image file or image buffer
 * @returns {Promise<Object>} Structured bottle data
 */
async function analyzeBottleImage(imagePath) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  try {
    // Read image file if it's a path
    let imageBuffer;
    if (typeof imagePath === 'string') {
      imageBuffer = fs.readFileSync(imagePath);
    } else {
      imageBuffer = imagePath;
    }

    // Convert to base64
    const base64Image = imageBuffer.toString('base64');

    // Create the prompt for bottle identification
    const prompt = `Analyze this image of an alcohol bottle and extract the following information in JSON format:
{
  "name": "Full product name (e.g., 'Jack Daniel's Old No. 7 Tennessee Whiskey')",
  "maker": "Brand or manufacturer name (e.g., 'Jack Daniel's')",
  "abv": "Alcohol by volume percentage as a number (e.g., 40 for 40%)",
  "msrp": "Suggested retail price in USD as a number (e.g., 26.99)"
}

Rules:
- If any information is not visible or unclear, use null for that field
- ABV should be a number (not a string with %)
- MSRP should be a number in USD
- Return ONLY valid JSON, no additional text or markdown formatting
- If multiple bottles are visible, analyze the most prominent one`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // or 'gpt-4-vision-preview' if available
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 500
    });

    const content = response.choices[0].message.content.trim();
    
    // Try to extract JSON from the response
    let bottleData;
    try {
      // Remove markdown code blocks if present
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        bottleData = JSON.parse(jsonMatch[0]);
      } else {
        bottleData = JSON.parse(content);
      }
    } catch (parseError) {
      // If JSON parsing fails, try to extract data manually
      console.warn('Failed to parse JSON response, attempting fallback parsing');
      bottleData = parseFallback(content);
    }

    // Validate and normalize the response
    return {
      name: bottleData.name || null,
      maker: bottleData.maker || null,
      abv: bottleData.abv ? parseFloat(bottleData.abv) : null,
      msrp: bottleData.msrp ? parseFloat(bottleData.msrp) : null
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to analyze image: ${error.message}`);
  }
}

/**
 * Fallback parser for when JSON parsing fails
 */
function parseFallback(content) {
  const result = {
    name: null,
    maker: null,
    abv: null,
    msrp: null
  };

  // Try to extract name
  const nameMatch = content.match(/name["\s:]+([^",\n}]+)/i);
  if (nameMatch) result.name = nameMatch[1].trim().replace(/['"]/g, '');

  // Try to extract maker
  const makerMatch = content.match(/maker["\s:]+([^",\n}]+)/i);
  if (makerMatch) result.maker = makerMatch[1].trim().replace(/['"]/g, '');

  // Try to extract ABV
  const abvMatch = content.match(/abv["\s:]+(\d+\.?\d*)/i);
  if (abvMatch) result.abv = parseFloat(abvMatch[1]);

  // Try to extract MSRP
  const msrpMatch = content.match(/msrp["\s:]+(\d+\.?\d*)/i);
  if (msrpMatch) result.msrp = parseFloat(msrpMatch[1]);

  return result;
}

module.exports = {
  analyzeBottleImage
};

