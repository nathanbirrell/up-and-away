import React from "react"

export const ValidationError = ({
  children,
  ...rest
}: React.HTMLProps<HTMLLabelElement>) => (
  <label
    className="block text-xs bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2 mb-2"
    {...rest}
  >
    {children}
  </label>
)
