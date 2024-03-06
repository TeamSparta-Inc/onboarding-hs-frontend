import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  value?: string;
}

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      {...props}
    />
  );
}
