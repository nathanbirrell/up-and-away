import { useState } from "react"
import { Input } from "../components/Input"
import { calculateTermDepositInterest } from "../util/InterestCalculators"
import { InterestFrequency } from "../types"
import { TERM_DEPOSIT_COPY } from "../copy"
import { formatMoney } from "../util/Currency"

// TODO: consider Formik/react-hook-form to reduce value-setting plumbing and easy validation

type FormState = {
  deposit: number
  termYears: number
  interestRate: number
  interestFrequency: InterestFrequency
}

export const TermDepositCalculator = () => {
  const [formState, setFormStateValue] = useState<FormState>({
    deposit: 10000,
    interestRate: 1.1, // 1.1%
    termYears: 3,
    interestFrequency: InterestFrequency.AT_MATURITY,
  })

  const setValue = (key: keyof FormState, value: FormState[keyof FormState]) =>
    setFormStateValue((prev) => ({ ...prev, [key]: value }))

  const totalInterestEarned = calculateTermDepositInterest({
    principal: formState.deposit,
    interestRate: formState.interestRate / 100,
    interestPaid: formState.interestFrequency,
    termInYears: formState.termYears,
  })

  const finalBalance = formState.deposit + totalInterestEarned

  return (
    <div>
      <h1 className="">Term deposit calculator</h1>

      <label className="block" htmlFor="deposit">
        <span className="text-gray-700">
          {TERM_DEPOSIT_COPY.Fields.Deposit.Label}
        </span>

        <Input
          id="deposit"
          name="deposit"
          placeholder={TERM_DEPOSIT_COPY.Fields.Deposit.Placeholder}
          value={formState.deposit}
          onChange={(e) => setValue("deposit", Number(e.target.value))}
        />
      </label>

      {/* TODO: add a formatter to present this value as a readable percentage (ie: 1.1% instead of 0.011) */}
      <label className="block" htmlFor="interestRate">
        <span className="text-gray-700">
          {TERM_DEPOSIT_COPY.Fields.InterestRate.Label}
        </span>

        <Input
          id="interestRate"
          name="interestRate"
          value={formState.interestRate}
          type="number"
          step=".01"
          onChange={(e) => setValue("interestRate", Number(e.target.value))}
        />
      </label>

      <label className="block" htmlFor="termYears">
        <span className="text-gray-700">
          {TERM_DEPOSIT_COPY.Fields.Term.Label}
        </span>

        <Input
          id="termYears"
          name="termYears"
          value={formState.termYears}
          onChange={(e) => setValue("termYears", Number(e.target.value))}
        />
      </label>

      <label className="block" htmlFor="interestFrequency">
        <span className="text-gray-700">
          {TERM_DEPOSIT_COPY.Fields.InterestFrequency.Label}
        </span>

        <select
          id="interestFrequency"
          name="interestFrequency"
          value={formState.interestFrequency}
          onChange={(e) =>
            setValue("interestFrequency", e.target.value as InterestFrequency)
          }
          className="block w-full mt-1"
        >
          {Object.entries(
            TERM_DEPOSIT_COPY.Fields.InterestFrequency.InterestFrequencyLabels,
          ).map(([value, text]) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-2">
        <span className="block text-gray-700">
          {TERM_DEPOSIT_COPY.FinalBalance}
        </span>
        <span className="block font-bold text-xl">
          {formatMoney(finalBalance)}
        </span>
      </div>

      <div className="mt-2">
        <span className="block text-gray-700">
          {TERM_DEPOSIT_COPY.InterestEarned}
        </span>
        <span className="block font-bold text-xl">
          {formatMoney(totalInterestEarned)}
        </span>
      </div>
    </div>
  )
}
