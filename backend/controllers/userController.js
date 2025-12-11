import AIModel from "../models/AIMode.js";
import calculationModel from "../models/CalcuationResult.js";
import userModel from "../models/userInput.js";
import { generateAIReport } from "../service/aiService.js";
import { calculateHarvest } from "../service/calculateHarvest.js";
import { getAnnualRainfall } from "../service/rainwaterApi.js";
//saving input
export const saveUserInput = async (req, res) => {
  try {
    const data = await userModel.create(req.body);
    res.json({ success: true, message: "User input saved", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//result calcuation controller
export const runCalcuation =async(req,res)=>{
    try {
        const { userId } = req.body;

      // 1. Fetch user input
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

     
    const annualRainfall = await getAnnualRainfall(user.location)  // Replace with API later

    //calcuate
   const resultValues = calculateHarvest({
      roofArea: user.roofArea,
      annualRainfall,
      familyMembers: user.familyMembers,
    });

    //save to db
    const result = await calculationModel.create({
         userInputId: userId,
      annualRainfall,
      ...resultValues,
    })
  res.json({
      success: true,
      data: result,
    });
    } catch (error) {
          res.status(500).json({ message: error.message });
    }
     
}

//generate report
export const generateReport =async(req,res)=>{
    try {
        const { calcId } = req.body;
        const calc = await calculationModel.findById(calcId);
         if (!calc) return res.status(404).json({ message: "Calculation not found" });

    const harvestedWater = calc.harvestedWater;
    const requiredWater = calc.requiredWater;
    const waterSaved = calc.harvestedWater - calc.requiredWater;
    const tankSize = calc.tankSize;

    // Estimate cost
    const cost = tankSize * 6;
    const annualSavings = Math.max(waterSaved, 0) * 1;
    const roi = annualSavings ? ((annualSavings / cost) * 100).toFixed(2) : 0;
    const paybackPeriod = annualSavings ? (cost / annualSavings).toFixed(1) : null;

      // CALL OPENAI
    const aiText = await generateAIReport({
      harvestedWater,
      requiredWater,
      waterSaved,
      tankSize,
      cost,
      roi,
      paybackPeriod
    });

    //save to db
    const report = await AIModel.create({
     userInputId: calc.userInputId,
      calculationId: calc._id,
      harvestedWater,
      waterSaved,
      tankSize,
      cost,
      roi,
      paybackPeriod,
      feasibilityText: harvestedWater >= requiredWater ? "Feasible" : "Not Feasible",
      aiReportText: aiText,

    })
       res.json({
      success: true,
      data: report,
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}