"use client";

import LinkButton from "@/app/common/components/LinkButton";
import { PATHS } from "@/constants/paths";
import { useEffect, useState } from "react";
import { STORAGE_KEYS, getFromStorage } from "./storage/storageService";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const accessToken = getFromStorage(STORAGE_KEYS.ACCESS_TOKEN);

    if (accessToken) setIsLogged(true);
  }, []);

  return (
    <main className="flex flex-col items-center  mt-10 justify-center gap-2 m-auto">
      {isLogged && (
        <>
          <LinkButton href={PATHS.SIGN_IN} text="로그인" />
          <LinkButton href={PATHS.SIGN_UP} text="회원가입" />
        </>
      )}
    </main>
  );
}
