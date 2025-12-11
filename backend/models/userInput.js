import mongoose from "mongoose";

const userInputSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    roofArea: { type: Number, required: true },
    location: { type: String, required: true },
    familyMembers: { type: Number, required: true },
    openArea: { type: Boolean, default: false },
    buildingType: { type: String },
  },
  { timestamps: true }
);

const userModel =
  mongoose.models.User || mongoose.model("User", userInputSchema);

  export default userModel