"use client";

import Button from "@/app/common/components/Button";
import Input from "@/app/common/components/Input";
import FormCard from "../common/components/FormCard";
import { FormEvent } from "react";
import { fetchSignin } from "../apis/auth";
import { STORAGE_KEYS, setToStorage } from "../storage/storageService";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/paths";

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

    const { accessToken, refreshToken } = await fetchSignin({
      username: email,
      password,
    });

    setToStorage(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    setToStorage(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

    router.push(PATHS.HOME);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="로그인 하세요">
        <Input type="email" name="email" placeholder="이메일" />
        <Input type="password" name="password" placeholder="비밀번호" />
        <Button>로그인</Button>
      </FormCard>
    </form>
  );
}
