export const Select = ({
  id,
  label,
  className,
  children,
  ...rest
}: React.InputHTMLAttributes<HTMLSelectElement> & { label: string }) => {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-gray-700">{label}</span>

      <select
        id={id}
        name={id}
        className={"block w-full mt-1" + className}
        {...rest}
      >
        {children}
      </select>
    </label>
  )
}
