import AIModel from "../models/AIMode.js";
import calculationModel from "../models/CalcuationResult.js";
import userAuthModel from "../models/user.js";
import userInputModel from "../models/userInput.js";
import { generateAIReport } from "../service/aiService.js";
import { calculateHarvest } from "../service/calculateHarvest.js";
import { getAnnualRainfall } from "../service/rainwaterApi.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator';
//saving input
export const saveUserInput = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    

    const data = await userInputModel.create(req.body);

    res.json({ success: true, message: "User input saved", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//result calcuation controller
export const runCalcuation =async(req,res)=>{
    try {
        const { userInputId } = req.body;
        console.log("REQ BODY:", req.body);
console.log("TYPE:", typeof req.body.userInputId);

      // 1. Fetch user input
    const user = await userInputModel.findById(userInputId);
    if (!user) return res.status(404).json({ message: "User not found" });

     
    const annualRainfall = await getAnnualRainfall(user.location)  

    //calcuate
   const resultValues = calculateHarvest({
      roofArea: user.roofArea,
      annualRainfall,
      familyMembers: user.familyMembers,
    });

    //save to db
    const result = await calculationModel.create({
         userInputId: user._id,
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
        const { calId } = req.body;
        console.log("REQ BODY:", req.body);
const userId = req.user.id;
        const calc = await calculationModel.findById(calId);
         if (!calc) return res.status(404).json({ message: "Calculation not found" });
console.log("CALC ID RECEIVED:", calId);

const userInput = await userInputModel.findById(calc.userInputId);
if (!userInput) {
  return res.status(404).json({ message: "User input not found" });
}
const city = userInput.location;
    const roofArea = userInput.roofArea;
const annualRainfall = await getAnnualRainfall(city);
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
      userId,
     userInputId: calc.userInputId,
      calculationId: calc._id,
      harvestedWater,
      waterSaved,
      tankSize,
      cost,
      roi,
        city,
      roofArea,
      annualRainfall,
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


//registrating user
export const registratingUser = async(req,res)=>{
  try {
     const {name,email,password} = req.body;
     if(!name||!password||!email){
        return res.json({success:false, message:"missing details"})
    }
    if(!validator.isEmail(email)){
          return res.json({success:false, message:"Enter a valid email"})
    }
    const userExist = await userAuthModel.findOne({ email });
    if (userExist) {
      return res.json({ message: "Email already registered" });
    }

    //hashing user password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData ={
        name,
        email,
        password:hashedPassword
    }

    const newUser =new userAuthModel(userData)
     const user = await newUser.save()

      const token = jwt.sign(
      { _id: user._id },

      process.env.JWT_SECRET,
     
    );
 res.json({
  success: true,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email
  },
  token
});
  } catch (error) {
     console.log(error)
      res.status(500).json({ message: "Server error", error: error.message });
  }
}

//logging
export const login = async(req,res)=>{
  try {
    const{email,password} = req.body
    console.log( req.body);

    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing email or password" });
    }
  
    const user = await userAuthModel.findOne({email})
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password,user.password)
   if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }
     const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      
    );
    console.log("TOKEN PAYLOAD ID =>", user._id);

     res.json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

//get report in dashboard

export const reports = async (req, res) => {
  try {
    const userId = req.user.id

    const reports = await AIModel.find({ userId });

    return res.json({
      success: true,
      message: "Showing reports",
      reports,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//fetch report 
export const viewReport = async(req,res)=>{
  try {
    const report = await AIModel.findById(req.params.id)
     if (!report) {
      return res.status(404).json({ success: false });
    }

    res.json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}
