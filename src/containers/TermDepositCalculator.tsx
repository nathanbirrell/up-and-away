import { useEffect, useState } from "react"
import { Input } from "../components/Input"
import { calculateTermDepositInterest } from "../util/InterestCalculators"
import { InterestFrequency } from "../types"
import { TERM_DEPOSIT_COPY } from "../copy"
import { formatMoney } from "../util/Currency"
import { ValidationError } from "../components/ValidationError"
import { inRange } from "lodash"
import { FormField } from "../components/FormField"

// TODO: consider Formik/react-hook-form to reduce value-setting plumbing and easy validation

type FormState = {
  deposit: number
  termYears: number
  interestRate: number
  interestFrequency: InterestFrequency
}

type FormValidationState = Partial<Record<keyof FormState, string | undefined>>

const INITIAL_VALUES: FormState = {
  deposit: 10000,
  interestRate: 1.1, // 1.1%
  termYears: 3,
  interestFrequency: InterestFrequency.AT_MATURITY,
}

const VALIDATORS: Partial<
  Record<keyof FormState, Array<(value: any) => string | undefined>>
> = {
  interestRate: [
    (value) =>
      inRange(value, 0, 20)
        ? undefined
        : "Interest Rate is usually a percentage between 0-20%",
  ],
}

export const TermDepositCalculator = () => {
  const [formState, setFormStateValue] = useState<FormState>(INITIAL_VALUES)

  const [errors, setFormErrors] = useState<FormValidationState>({})

  const setValue = (key: keyof FormState, value: FormState[keyof FormState]) =>
    setFormStateValue((prev) => ({ ...prev, [key]: value }))

  // Validate on change as this is a live calculator
  useEffect(() => {
    setFormErrors(validateForm(formState))
  }, [formState, setFormErrors])

  const totalInterestEarned = calculateTermDepositInterest({
    principal: formState.deposit,
    interestRate: formState.interestRate / 100,
    interestPaid: formState.interestFrequency,
    termInYears: formState.termYears,
  })

  const finalBalance = formState.deposit + totalInterestEarned

  return (
    <div>
      <h1 className="">{TERM_DEPOSIT_COPY.Title}</h1>

      <form>
        <FormField
          id="deposit"
          label={TERM_DEPOSIT_COPY.Fields.Deposit.Label}
          placeholder={TERM_DEPOSIT_COPY.Fields.Deposit.Placeholder}
          value={formState.deposit}
          onChange={(e) => setValue("deposit", Number(e.target.value))}
        />

        {/* TODO: add a formatter to present this value as a readable percentage (ie: 1.1% instead of 0.011) */}

        <FormField
          id="interestRate"
          label={TERM_DEPOSIT_COPY.Fields.InterestRate.Label}
          value={formState.interestRate}
          type="number"
          step=".01"
          onChange={(e) => setValue("interestRate", Number(e.target.value))}
        />
        {errors.interestRate && (
          <ValidationError htmlFor="interestRate">
            {errors.interestRate}
          </ValidationError>
        )}

        <FormField
          id="termYears"
          label={TERM_DEPOSIT_COPY.Fields.Term.Label}
          value={formState.termYears}
          onChange={(e) => setValue("termYears", Number(e.target.value))}
        />

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
              TERM_DEPOSIT_COPY.Fields.InterestFrequency
                .InterestFrequencyLabels,
            ).map(([value, text]) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </label>
      </form>

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

// TODO: abstract this out into a form-generic validator which takes a FormState type argument
//          ... or use a form library!
const validateForm = (values: FormState): FormValidationState => {
  const errors: FormValidationState = {}

  Object.entries(VALIDATORS)
    // skip fields without validation
    .filter(([_, validator]) => !!validator)
    .forEach(([key, validators]) => {
      // run each validator
      validators.some((validator) => {
        const error = validator(values[key as keyof FormState])
        if (error) {
          errors[key as keyof FormState] = error
          return true
        }
      })
    })

  return errors
}
