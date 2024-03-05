interface InputProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: () => void;
}

export default function Input({
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
    />
  );
}
