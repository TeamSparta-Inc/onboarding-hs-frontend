import { PATHS } from "@/constants/paths";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/public/teamspartainc_logo.jpeg";

export default function GNB() {
  return (
    <nav className="bg-white-500 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-shrink-0">
            <Link href={PATHS.HOME}>
              <Image
                src={logoImage}
                alt="team_sparta_logo"
                width={80}
                height={40}
              />
            </Link>
            <h1 className="flex bold ml-4 items-center text-center">
              김혜성 온보딩 페이지 헤헤
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
}
