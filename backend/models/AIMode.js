import mongoose  from "mongoose";
const AIInsightSchema = new mongoose.Schema(
  {
    userInputId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserAuth", required: true },
    calculationId: { type: mongoose.Schema.Types.ObjectId, ref: "calculationResult", required: true },
city: {
      type: String,
      required: true,
    },

    roofArea: {
      type: Number,
      required: true,
    },

    annualRainfall: {
      type: Number,
      required: true,
    },
  harvestedWater: Number,
    waterSaved: Number,
    tankSize: Number,
    cost: Number,
    roi: Number,
    paybackPeriod: Number,
    feasibilityText: String,

    aiReportText: String,  // Full OpenAI report here
  },
  { timestamps: true }
);

const AIModel =
  mongoose.models.AIModel|| mongoose.model("AIModel", AIInsightSchema);

  export default AIModel