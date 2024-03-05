import Link from "next/link";

interface LinkButtonProps {
  href: string;
  text: string;
}

export default function LinkButton({ href, text }: LinkButtonProps) {
  return (
    <Link href={href}>
      <div className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        {text}
      </div>
    </Link>
  );
}
