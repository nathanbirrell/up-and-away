import numeral from "numeral"

export const formatMoney = (value: number) => numeral(value).format("$0,0.00")
