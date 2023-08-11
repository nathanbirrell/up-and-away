import React from "react"
import classnames from "classnames"

export const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={classnames(
        "px-4 py-2 font-semibold text-sm bg-sky-500 hover:bg-sky-500/90 text-white rounded-md shadow-sm opacity-100",
        props.className,
      )}
      {...props}
    />
  )
}
