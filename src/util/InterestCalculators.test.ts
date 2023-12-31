import { expect, test } from "vitest"
import { InterestFrequency } from "../types"
import { calculateTermDepositInterest } from "./InterestCalculators"

test("calculates interest paid at maturity correctly", () => {
  expect(
    calculateTermDepositInterest({
      principal: 10000,
      interestRate: 0.011,
      interestFrequency: InterestFrequency.AT_MATURITY,
      termInYears: 3,
    }).toFixed(2),
  ).toEqual("330.00")
  expect(
    calculateTermDepositInterest({
      principal: 10000,
      interestRate: 0.021,
      interestFrequency: InterestFrequency.AT_MATURITY,
      termInYears: 5,
    }).toFixed(2),
  ).toEqual("1050.00")
})

test("calculates interest paid monthly correctly", () => {
  expect(
    calculateTermDepositInterest({
      principal: 10000,
      interestRate: 0.011,
      interestFrequency: InterestFrequency.MONTHLY,
      termInYears: 3,
    }).toFixed(2),
  ).toEqual("335.35")
})

test("calculates interest paid annually correctly", () => {
  expect(
    calculateTermDepositInterest({
      principal: 10000,
      interestRate: 0.011,
      interestFrequency: InterestFrequency.ANNUALLY,
      termInYears: 3,
    }).toFixed(2),
  ).toEqual("333.64")
})

test("calculates interest paid quarterly correctly", () => {
  expect(
    calculateTermDepositInterest({
      principal: 10000,
      interestRate: 0.011,
      interestFrequency: InterestFrequency.QUARTERLY,
      termInYears: 3,
    }).toFixed(2),
  ).toEqual("335.04")
})
