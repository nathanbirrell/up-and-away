import { useState } from "react"
import "./App.css"
import { TermDepositCalculator } from "./containers/TermDepositCalculator"

function App() {
  return (
    <>
      <div className="prose">
        <TermDepositCalculator />
      </div>
    </>
  )
}

export default App
