"use client";

import Button from "@/app/common/components/Button";
import Input from "@/app/common/components/Input";
import FormCard from "../common/components/FormCard";
import { fetchSignup } from "../apis/auth";
import { FormEvent } from "react";
import { STORAGE_KEYS, setToStorage } from "../storage/storageService";

export default function SignUp() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      //handle error
      return false;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="회원가입 하세요">
        <Input type="email" name="email" placeholder="이메일" />
        <Input type="password" name="password" placeholder="비밀번호" />
        <Button>회원가입</Button>
      </FormCard>
    </form>
  );
}
