import mongoose from "mongoose";

const calculationResultSchema = new mongoose.Schema(
  {
    userInputId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    annualRainfall: Number, // from API 

    harvestedWater: Number, // total liters per year

    dailyUsage: Number, 

    requiredWater: Number, 

    surplusOrShortage: String, 

    tankSize: Number, // recommended liters
  },
  { timestamps: true }
);

const calculationModel =
  mongoose.models.calculationResult || mongoose.model("calculationResult", calculationResultSchema);

  export default calculationModel