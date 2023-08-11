import { useState } from "react"
import { Input } from "../components/Input"

// TODO: consider Formik to reduce value-setting plumbing

type FormState = {
  deposit: number
  interestRate: number
  termYears: number
  interestFrequency: InterestFrequency
}

enum InterestFrequency {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUALLY = "ANNUALLY",
  AT_MATURITY = "AT_MATURITY",
}

const InterestFrequencyOptions: Record<InterestFrequency, string> = {
  [InterestFrequency.MONTHLY]: "Monthly",
  [InterestFrequency.QUARTERLY]: "Quarterly",
  [InterestFrequency.ANNUALLY]: "Annually",
  [InterestFrequency.AT_MATURITY]: "At Maturity",
}

export const TermDepositCalculator = () => {
  const [formState, setFormStateValue] = useState<FormState>({
    deposit: 10000,
    interestRate: 0.011, // 1.1%
    termYears: 3,
    interestFrequency: InterestFrequency.AT_MATURITY,
  })

  const setValue = (key: keyof FormState, value: FormState[keyof FormState]) =>
    setFormStateValue((prev) => ({ ...prev, [key]: value }))

  return (
    <div>
      <h1 className="">Term deposit calculator</h1>

      <label className="block" htmlFor="deposit">
        <span className="text-gray-700">Initial deposit ($)</span>

        <Input
          id="deposit"
          name="deposit"
          placeholder="For example, $10,000"
          value={formState.deposit}
          onChange={(e) => setValue("deposit", Number(e.target.value))}
        />
      </label>

      <label className="block" htmlFor="interestRate">
        <span className="text-gray-700">Interest rate (%)</span>

        <Input
          id="interestRate"
          name="interestRate"
          value={formState.interestRate}
          onChange={(e) => setValue("interestRate", Number(e.target.value))}
        />
      </label>

      <label className="block" htmlFor="termYears">
        <span className="text-gray-700">Investment term (years)</span>

        <Input
          id="termYears"
          name="termYears"
          value={formState.termYears}
          onChange={(e) => setValue("termYears", Number(e.target.value))}
        />
      </label>

      <label className="block" htmlFor="interestFrequency">
        <span className="text-gray-700">Interest paid</span>

        <select
          id="interestFrequency"
          name="interestFrequency"
          value={formState.interestFrequency}
          onChange={(e) =>
            setValue("interestFrequency", e.target.value as InterestFrequency)
          }
          className="block w-full mt-1"
        >
          {Object.entries(InterestFrequencyOptions).map(([value, text]) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-2">
        <span className="block text-gray-700">Final Balance</span>
        <span className="block font-bold text-xl">$TODO</span>
      </div>

      <div className="mt-2">
        <span className="block text-gray-700">Interest Earned</span>
        <span className="block font-bold text-xl">$TODO</span>
      </div>
    </div>
  )
}