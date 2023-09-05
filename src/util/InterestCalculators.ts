import { InterestFrequency } from "../types"

const InterestEventsPerYear = {
  [InterestFrequency.AT_MATURITY]: 12,
  [InterestFrequency.ANNUALLY]: 1,
  [InterestFrequency.QUARTERLY]: 4,
  [InterestFrequency.MONTHLY]: 12,
}

type TermDepositInterestArgs = {
  principal: number
  // percentage in decimal form (0-1)
  interestRate: number
  interestFrequency: InterestFrequency
  termInYears: number
}

/**
 * Calculate the interest earned on a term deposit, given:
 *    - principal: the initial deposit amount
 *    - interestRate: a percentage in decimal form (0-1)
 *    - interestFrequency: number of times per year interest is paid out
 *    - termInYears: the total duration of the term deposit in years
 *
 * @returns total interest earned on term deposit
 */
export const calculateTermDepositInterest = ({
  principal,
  interestRate,
  interestFrequency,
  termInYears,
}: TermDepositInterestArgs) => {
  if (interestFrequency == InterestFrequency.AT_MATURITY) {
    return principal * interestRate * termInYears
  }

  const interestEventsPerYear = InterestEventsPerYear[interestFrequency]

  return (
    principal *
      (1 + interestRate / interestEventsPerYear) **
        (interestEventsPerYear * termInYears) -
    principal
  )
}
