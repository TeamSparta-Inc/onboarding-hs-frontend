"use client";

import LinkButton from "@/app/common/components/LinkButton";
import { PATHS } from "@/constants/paths";
import { useEffect, useState } from "react";
import { STORAGE_KEYS, getFromStorage } from "./storage/storageService";
import { HackleProvider, createInstance } from "@hackler/react-sdk";

const hackleClient = createInstance("mHLlaqSiEjXOIaUzVPmxr5mZDEF5wTS9");

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const accessToken = getFromStorage<string>(STORAGE_KEYS.ACCESS_TOKEN);

    setIsLogged(!!accessToken);
  }, []);

  return (
    <main className="flex flex-col items-center  mt-10 justify-center gap-2 m-auto">
      {!isLogged ? (
        <HackleProvider hackleClient={hackleClient}>
          <LinkButton href={PATHS.SIGN_IN} text="로그인" />
          <LinkButton href={PATHS.SIGN_UP} text="회원가입" />
        </HackleProvider>
      ) : (
        <h1>환영합니다!</h1>
      )}
    </main>
  );
}
