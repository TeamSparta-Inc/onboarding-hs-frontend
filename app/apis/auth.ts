import { DEFAULT_PATH, END_POINTS } from "@/constants/endpoints";
import * as Sentry from "@sentry/nextjs";

interface FetchSignin {
  username: string;
  password: string;
}

interface FetchSignup extends FetchSignin {}

interface RefreshToken {
  token: string;
}

interface FetchSigninResponse {
  accessToken: string;
  refreshToken: string;
}

interface FetchSignupResponse {
  username: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}

export async function fetchSignin({
  username,
  password,
}: FetchSignin): Promise<FetchSigninResponse> {
  try {
    const response = await fetch(DEFAULT_PATH + END_POINTS.SIGN_IN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    return response.json();
  } catch (error) {
    Sentry.captureException(error);
    throw new Error("로그인에 실패했습니다.");
  }
}

export async function fetchSignup({
  username,
  password,
}: FetchSignup): Promise<FetchSignupResponse> {
  const response = await fetch(DEFAULT_PATH + END_POINTS.SIGN_UP, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
}

export async function refreshToken({
  token,
}: RefreshToken): Promise<RefreshTokenResponse> {
  const response = await fetch(DEFAULT_PATH + END_POINTS.REFRESH_TOKEN, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
