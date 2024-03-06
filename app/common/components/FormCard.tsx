import { ReactNode } from "react";

interface FormCardProps {
  title?: string;
  children: ReactNode;
}

export default function FormCard({ title, children }: FormCardProps) {
  return (
    <div className="flex justify-center rounded border-2 shadow-lg p-12 w-fit">
      <div className="flex flex-col items-center gap-2 w-60">
        <h1 className="mb-5">{title}</h1>
        {children}
      </div>
    </div>
  );
}
