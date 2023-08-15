import { InterestFrequency } from "../types"

const InterestEventsPerYear = {
  [InterestFrequency.AT_MATURITY]: 12,
  [InterestFrequency.ANNUALLY]: 1,
  [InterestFrequency.QUARTERLY]: 4,
  [InterestFrequency.MONTHLY]: 12,
}

export const calculateTermDepositInterest = ({
  principal,
  interestRate,
  interestPaid,
  termInYears,
}: {
  principal: number
  // percentage in decimal form (0-1)
  interestRate: number
  interestPaid: InterestFrequency
  termInYears: number
}) => {
  if (interestPaid == InterestFrequency.AT_MATURITY) {
    return principal * interestRate * termInYears
  }

  const interestEventsPerYear = InterestEventsPerYear[interestPaid]

  return (
    principal *
      (1 + interestRate / interestEventsPerYear) **
        (interestEventsPerYear * termInYears) -
    principal
  )
}
