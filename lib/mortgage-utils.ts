import { getTaxData, FIXED_FEES } from "@/data/taxes/es";

export interface MortgageParams {
  propertyPrice: number;
  savings: number;
  years: number;
  interestRate: number; // Annual TIN in % (e.g. 2.5)
  euribor?: number; // For variable
  differential?: number; // For variable
  isVariable: boolean;
  province: string;
  propertyType: "new" | "used";
}

export interface MortgageResults {
  monthlyQuota: number;
  totalInterests: number;
  loanAmount: number;
  expenses: {
    taxes: number; // ITP or IVA
    notary: number;
    registry: number;
    agency: number;
    appraisal: number;
    total: number;
  };
  downPayment: number; // Actual money paid upfront (Savings)
  // But usually "Entrada" means Savings - Expenses?
  // The prompt says: "Entrada = A - G" (Savings - Expenses).
  // "Importe a financiar (F) = P - A + G"
  // So "Entrada" displayed is the net down payment towards the house price.
  netDownPayment: number; 
  taxesRate: number; // The % used
}

export function calculateMortgage(params: MortgageParams): MortgageResults {
  const { propertyPrice, savings, years, interestRate, province, propertyType } = params;
  const taxData = getTaxData(province);
  
  // 1. Calculate Expenses
  let taxRate = 0;
  let taxes = 0;

  if (propertyType === "new") {
    taxRate = taxData.iva; // IVA (or IGIC)
    // AJD assumed to be paid by bank for mortgage. 
    // AJD for purchase deed (compraventa) usually applies to buyer in new homes (~1.5%), 
    // but prompt says "El AJD lo asume el banco... por lo que el comprador no lo asume en obra nueva".
    // We will stick to prompt instructions and only apply IVA.
    taxes = propertyPrice * taxRate;
  } else {
    taxRate = taxData.itp; // ITP
    // AJD for mortgage paid by bank. ITP covers purchase.
    taxes = propertyPrice * taxRate;
  }

  const fixedExpenses = FIXED_FEES.notary + FIXED_FEES.registry + FIXED_FEES.agency + FIXED_FEES.appraisal;
  const totalExpenses = taxes + fixedExpenses;

  // 2. Calculate Loan Amount
  // Loan = Price + Expenses - Savings
  let loanAmount = propertyPrice + totalExpenses - savings;
  if (loanAmount < 0) loanAmount = 0;

  // 3. Calculate Quota
  // Formula: a = C * i / (1 - (1+i)^-n)
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = years * 12;
  
  let monthlyQuota = 0;
  let totalInterests = 0;

  if (loanAmount > 0) {
    if (monthlyRate === 0) {
        monthlyQuota = loanAmount / totalMonths;
    } else {
        monthlyQuota = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
    }
    totalInterests = (monthlyQuota * totalMonths) - loanAmount;
  }

  return {
    monthlyQuota: Math.round(monthlyQuota),
    totalInterests: Math.round(totalInterests),
    loanAmount: Math.round(loanAmount),
    expenses: {
      taxes: Math.round(taxes),
      notary: FIXED_FEES.notary,
      registry: FIXED_FEES.registry,
      agency: FIXED_FEES.agency,
      appraisal: FIXED_FEES.appraisal,
      total: Math.round(totalExpenses)
    },
    downPayment: savings,
    netDownPayment: savings - Math.round(totalExpenses),
    taxesRate: taxRate * 100
  };
}
