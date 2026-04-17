const today = new Date().toISOString().split('T')[0];

export const dailyRates = {
  date: today,
  rates: [
    { name: "Clear Float", rate: "₹45 - ₹60", trend: "stable" },
    { name: "Toughened", rate: "₹120 - ₹160", trend: "up" },
    { name: "Laminated", rate: "₹180 - ₹250", trend: "stable" },
    { name: "DGU/IGU", rate: "₹350 - ₹500", trend: "down" },
    { name: "Frosted", rate: "₹85 - ₹110", trend: "stable" },
    { name: "Reflective", rate: "₹100 - ₹140", trend: "up" },
    { name: "Low-E Glass", rate: "₹200 - ₹300", trend: "stable" },
    { name: "Back-Painted", rate: "₹150 - ₹220", trend: "stable" }
  ]
};
