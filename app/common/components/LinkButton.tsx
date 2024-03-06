import Link from "next/link";

interface LinkButtonProps {
  href: string;
  text: string;
}

export default function LinkButton({ href, text }: LinkButtonProps) {
  return (
    <Link className="h-14 w-60" href={href}>
      <div className="flex justify-center items-center bg-red-500 hover:bg-red-600 text-white font-bold h-full w-full rounded">
        {text}
      </div>
    </Link>
  );
}
