/**
 * Calculate Net Salary safely
 * Handles null/undefined values automatically
 * 
 * @param {Number} basicSalary - Fixed salary
 * @param {Number} bonus - Bonus amount (default 0)
 * @param {Number} pf - Provident Fund deduction (default 0)
 * @param {Number} tds - Tax Deducted at Source (default 0)
 * @returns {Object} - Detailed salary breakdown
 */
module.exports = function calculateNetSalarySafe({
  basicSalary = 0,
  bonus = 0,
  pf = 0,
  tds = 0,
}) {
  // Ensure null/undefined values become 0
  basicSalary = basicSalary ?? 0;
  bonus = bonus ?? 0;
  pf = pf ?? 0;
  tds = tds ?? 0;

  // Net Salary Calculation
  const netSalary =
    basicSalary  +
    bonus -
    (pf + tds);

  return {
    bonus,
    pf,
    tds,
    netSalary
  };
}
