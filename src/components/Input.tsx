import React from "react"
import classnames from "classnames"

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="text"
      className={classnames(
        "mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
        props.className,
      )}
      {...props}
    />
  )
}
