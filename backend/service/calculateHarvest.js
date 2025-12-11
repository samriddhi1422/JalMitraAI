export const calculateHarvest = ({
  roofArea,
  annualRainfall,
  familyMembers
}) => {

  const efficiency = 0.8; // 80%
  const conversionFactor = 0.623;

  // 1. Calculate harvested water
  const harvestedWater =
    roofArea * annualRainfall * conversionFactor * efficiency;

  // 2. Daily water requirement
  const dailyUsage = familyMembers * 135; // 135 liters per person per day (Govt standard)

  // 3. Annual water requirement
  const requiredWater = dailyUsage * 365;

  // 4. Surplus or shortage
  const surplusOrShortage =
    harvestedWater >= requiredWater ? "Surplus" : "Shortage";

  // 5. Recommended tank size (20% of annual harvest)
  const tankSize = harvestedWater * 0.2;

  return {
    harvestedWater: Math.round(harvestedWater),
    dailyUsage,
    requiredWater,
    surplusOrShortage,
    tankSize: Math.round(tankSize),
  };
};
