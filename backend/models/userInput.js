import mongoose from "mongoose";

const userInputSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
    },
    name: { type: String, required: true },
    roofArea: { type: Number, required: true },
    location: { type: String, required: true },
    familyMembers: { type: Number, required: true },
    openArea: { type: Boolean, default: false },
    buildingType: { type: String },
  },
  { timestamps: true }
);

const userInputModel =
  mongoose.models.UserInput || mongoose.model("UserInput", userInputSchema);

  export default userInputModel