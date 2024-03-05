import { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({ onClick, children }: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      }
    >
      {children}
    </button>
  );
}
