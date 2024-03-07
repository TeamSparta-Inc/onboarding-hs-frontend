"use client";

import Button from "@/app/common/components/Button";
import Input from "@/app/common/components/Input";
import FormCard from "../common/components/FormCard";
import { FormEvent } from "react";
import { fetchSignin } from "../apis/auth";
import { STORAGE_KEYS, setToStorage } from "../storage/storageService";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/paths";
import * as CPL from "@teamsparta/cross-platform-logger";
import { HackleExperiment, HackleVariation } from "@hackler/react-sdk";

CPL.initCPLog(
  "ap-northeast-2:836ea2e6-cfdd-4b49-a481-152477b6dac2",
  "be547742b99daa9e3331f207b975d850",
  "9BKeZwOuZ9JAKXlNBs0sNd2YmyMChj7s",
  !false
);

export default function Signin() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      //handle error
      return false;
    }

    try {
      const { accessToken, refreshToken } = await fetchSignin({
        username: email,
        password,
      });

      setToStorage(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      setToStorage(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

      CPL.sendCPLog("hs_onboarding", { test: "testData" }, false);

      router.push(PATHS.HOME);
    } catch {}
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="Sign In">
        <Input type="email" name="email" placeholder="이메일" />
        <Input type="password" name="password" placeholder="비밀번호" />
        <Button>로그인</Button>
      </FormCard>
    </form>
  );
}
