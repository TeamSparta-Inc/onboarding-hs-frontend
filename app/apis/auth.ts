import { DEFAULT_PATH, END_POINTS } from "@/constants/endpoints";

interface FetchSignin {
  username: string;
  password: string;
}

interface FetchSignup extends FetchSignin {}

interface RefreshToken {
  token: string;
}

export async function fetchSignin({ username, password }: FetchSignin) {
  const response = await fetch(DEFAULT_PATH + END_POINTS.SIGN_IN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
}

export async function fetchSignup({ username, password }: FetchSignup) {
  const response = await fetch(DEFAULT_PATH + END_POINTS.SIGN_UP, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
}

export async function refreshToken({ token }: RefreshToken) {
  const response = await fetch(DEFAULT_PATH + END_POINTS.REFRESH_TOKEN, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
