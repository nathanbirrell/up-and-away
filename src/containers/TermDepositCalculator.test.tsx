import { test, expect } from "vitest"
import { fireEvent, render } from "@testing-library/react"
import { TermDepositCalculator } from "./TermDepositCalculator"

test("renders", async () => {
  const screen = render(<TermDepositCalculator />)

  expect(await screen.findByText(/Term deposit calculator/)).toBeInTheDocument()
})

test("calculates correctly", async () => {
  const screen = render(<TermDepositCalculator />)

  fireEvent.change(screen.getByLabelText("Initial deposit ($)"), {
    target: { value: "5000" },
  })

  expect(await screen.findByText(/\$5,165.00/)).toBeInTheDocument()
  expect(await screen.findByText(/\$165.00/)).toBeInTheDocument()

  fireEvent.change(screen.getByLabelText("Investment term (years)"), {
    target: { value: "5" },
  })

  expect(await screen.findByText(/\$5,275.00/)).toBeInTheDocument()
  expect(await screen.findByText(/\$275.00/)).toBeInTheDocument()
})
