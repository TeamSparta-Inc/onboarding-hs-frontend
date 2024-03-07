import { HackleExperiment, HackleVariation } from "@hackler/react-sdk";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  text: string;
}

export default function LinkButton({ href, text }: LinkButtonProps) {
  return (
    <>
      <HackleExperiment experimentKey={266}>
        <HackleVariation variation={"A"}>
          <Link className="h-14 w-60" href={href}>
            <div className="flex justify-center items-center bg-red-500 hover:bg-red-600 text-white font-bold h-full w-full rounded">
              {text}
            </div>
          </Link>
        </HackleVariation>
      </HackleExperiment>
      <HackleExperiment experimentKey={266}>
        <HackleVariation variation={"B"}>
          <Link className="h-14 w-60" href={href}>
            <div className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-bold h-full w-full rounded">
              {text}
            </div>
          </Link>
        </HackleVariation>
      </HackleExperiment>
    </>
  );
}
