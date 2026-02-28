const express = require("express");
const router = express.Router();
const { generateResponse } = require("../utils/geminiClient");

// POST /api/calculate/dowry-awareness
router.post("/dowry-awareness", async (req, res) => {
  try {
    const {
      groomAge,
      groomEducation,
      groomProfession,
      groomIncome,
      groomAssets,
      cityTier,
      familyBackground,
      brideEducation,
      brideIncome,
      weddingScale,
      dependents,
    } = req.body;

    const prompt = `You are an educational awareness AI assistant for an anti-dowry platform called "Reality Check".

IMPORTANT ETHICAL GUIDELINES:
- You must ALWAYS emphasize that dowry is ILLEGAL under the Dowry Prohibition Act, 1961.
- You must NEVER encourage or normalize dowry.
- Frame everything as "social perception analysis" for AWARENESS purposes only.
- Include strong anti-dowry messaging in your response.

Based on the following socioeconomic factors, analyze the approximate "social expectation range" that unfortunately still exists in parts of Indian society. This is PURELY for awareness — to show how biased and discriminatory these expectations are.

INPUT DATA:
- Groom Age: ${groomAge || "Not specified"}
- Groom Education: ${groomEducation || "Not specified"}
- Groom Profession: ${groomProfession || "Not specified"}
- Groom Annual Income: ₹${groomIncome || "Not specified"}
- Groom Assets: ${groomAssets || "Not specified"}
- City Tier: ${cityTier || "Not specified"}
- Family Background: ${familyBackground || "Not specified"}
- Bride Education: ${brideEducation || "Not specified"}
- Bride Income: ₹${brideIncome || "Not specified"}
- Wedding Scale: ${weddingScale || "Not specified"}
- Dependents: ${dependents || "Not specified"}

Respond in this exact JSON format:
{
  "estimatedRange": {
    "low": <number in INR>,
    "high": <number in INR>
  },
  "factors": [
    {
      "name": "<factor name>",
      "impact": "<high/medium/low>",
      "contribution": <percentage as number>,
      "explanation": "<brief explanation of how this factor influences social perception>"
    }
  ],
  "awarenessMessage": "<A strong 2-3 sentence anti-dowry awareness message emphasizing that dowry is illegal, harmful, and should be eradicated. Mention the Dowry Prohibition Act, 1961.>",
  "socialContext": "<A brief paragraph explaining why these social expectations exist and why they are problematic>",
  "legalReminder": "Dowry is a punishable offense under the Dowry Prohibition Act, 1961. Giving or receiving dowry can result in imprisonment up to 5 years and a fine of ₹15,000 or the amount of dowry, whichever is more."
}

Make sure the factors array contains 5-7 factors that add up to approximately 100% contribution.
The estimated range should reflect realistic (though unfortunate) social expectations based on the provided data.`;

    const result = await generateResponse(prompt);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Dowry awareness calculation error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/calculate/alimony
router.post("/alimony", async (req, res) => {
  try {
    const {
      marriageDuration,
      children,
      childCustody,
      husbandIncome,
      wifeIncome,
      standardOfLiving,
      assets,
      liabilities,
      husbandEmployment,
      wifeEmployment,
      healthConditions,
      careerSacrifice,
    } = req.body;

    const prompt = `You are an educational legal awareness AI assistant for a platform called "Reality Check".

IMPORTANT GUIDELINES:
- This is for INFORMATIONAL purposes only and does NOT constitute legal advice.
- Emphasize that actual maintenance amounts are determined by courts based on case-specific circumstances.
- Be balanced and neutral in your analysis.
- Reference relevant Indian laws (Hindu Marriage Act Sections 24 & 25, CrPC Section 125).

Based on the following factors, provide an approximate maintenance/alimony estimation range that Indian courts might consider. This is purely educational.

INPUT DATA:
- Marriage Duration: ${marriageDuration || "Not specified"} years
- Children: ${children || "Not specified"}
- Child Custody: ${childCustody || "Not specified"}
- Husband's Monthly Income: ₹${husbandIncome || "Not specified"}
- Wife's Monthly Income: ₹${wifeIncome || "Not specified"}
- Standard of Living: ${standardOfLiving || "Not specified"}
- Assets: ${assets || "Not specified"}
- Liabilities: ${liabilities || "Not specified"}
- Husband's Employment: ${husbandEmployment || "Not specified"}
- Wife's Employment: ${wifeEmployment || "Not specified"}
- Health Conditions: ${healthConditions || "Not specified"}
- Career Sacrifice by Wife: ${careerSacrifice || "Not specified"}

Respond in this exact JSON format:
{
  "estimatedMonthlyRange": {
    "low": <number in INR>,
    "high": <number in INR>
  },
  "factors": [
    {
      "name": "<factor name>",
      "impact": "<high/medium/low>",
      "contribution": <percentage as number>,
      "explanation": "<brief explanation of how courts typically consider this factor>"
    }
  ],
  "legalBasis": "<Explain the legal basis for maintenance under Indian law — reference HMA Sections 24, 25 and CrPC 125>",
  "courtDiscretion": "<Explain that courts have wide discretion and actual amounts vary significantly based on individual cases>",
  "disclaimer": "This is an AI-generated approximation for educational purposes only. Actual maintenance amounts are determined by courts based on comprehensive evaluation of individual circumstances. Please consult a qualified legal professional for advice specific to your situation."
}

Make sure the factors array contains 5-7 factors that add up to approximately 100% contribution.
The estimated range should reflect realistic ranges that Indian courts might consider based on the provided data.`;

    const result = await generateResponse(prompt);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Alimony calculation error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
