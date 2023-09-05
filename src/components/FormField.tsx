import { Input } from "./Input"

export const FormField = ({
  id,
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-gray-700">{label}</span>

      <Input id={id} name={id} {...rest} />
    </label>
  )
}
