import { InterestFrequency } from "./types"

const InterestFrequencyLabels: Record<InterestFrequency, string> = {
  [InterestFrequency.MONTHLY]: "Monthly",
  [InterestFrequency.QUARTERLY]: "Quarterly",
  [InterestFrequency.ANNUALLY]: "Annually",
  [InterestFrequency.AT_MATURITY]: "At Maturity",
}

export const TERM_DEPOSIT_COPY = {
  Title: "Term deposit calculator",
  Fields: {
    Deposit: {
      Label: "Initial deposit ($)",
      Placeholder: "For example, $10,000",
    },
    InterestRate: {
      Label: "Interest rate (%)",
    },
    Term: {
      Label: "Investment term (years)",
    },
    InterestFrequency: {
      Label: "Interest paid",
      InterestFrequencyLabels,
    },
  },
  FinalBalance: "Final Balance",
  InterestEarned: "Interest Earned",
}
