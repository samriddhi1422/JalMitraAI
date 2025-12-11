import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateAIReport = async ({
  harvestedWater,
  requiredWater,
  waterSaved,
  tankSize,
  cost,
  roi,
  paybackPeriod
}) => {

  const prompt = `
Generate a professional rainwater harvesting feasibility report.

Inputs:
- Total Water Harvested: ${harvestedWater} liters/year
- Required Water: ${requiredWater} liters/year
- Water Saved After Usage: ${waterSaved} liters/year
- Tank Size Needed: ${tankSize} liters
- Estimated Cost: ₹${cost}
- ROI: ${roi}%
- Payback Period: ${paybackPeriod} years

Write the report with:
1. Feasible or Not feasibility conclusion  
2. Summary of harvested water  
3. Water savings explanation  
4. Cost analysis  
5. ROI and payback explanation  
6. Structure recommendation  
7. Tank recommendation  
8. Actionable suggestions to improve feasibility  
9. Simple action plan

Keep the tone technical but easy to understand.
`;

 const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "You are a rainwater harvesting engineer." },
      { role: "user", content: prompt }
    ]
  });

  return response.choices[0].message.content;
};
