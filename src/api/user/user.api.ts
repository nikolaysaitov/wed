import { api } from "../api.ts";
import { Credentials, ICheckUser, IUserForCode, User, OAuthRequest, UserRequirements } from "./user.ts";
import { AxiosRequestConfig } from "axios";
import { Guest } from "@api/guest/guest.ts";

export async function login(credentials: Credentials): Promise<{ token: string }> {
  const response = await api.post<{ token: string }>(`/auth/verifyOTP`, credentials);

  if (response.data.token) {
    localStorage.setItem("jwt", response.data.token);
  }

  return response.data;
}

export async function loginOAuth(credentials: OAuthRequest): Promise<{ newToken: string }> {
  const response = await api.post<{ newToken: string }>(`/auth/login`, credentials);

  if (response.data.newToken) {
    localStorage.setItem("jwt", response.data.newToken);
  }

  return response.data;
}

export async function sendCode(email: IUserForCode): Promise<UserRequirements> {
  const response = await api.post<{ user: UserRequirements }>(`/auth/check`, email);

  return response.data.user;
}

export async function logout(): Promise<unknown> {
  const response = await api.post<unknown>(`/auth/logout`, {});

  return response.data;
}

export async function getUserData(token?: string): Promise<User | null> {
  const config: AxiosRequestConfig = { headers: {} };

  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await api.get<User>(`/auth/me`, config);

  return response?.data ?? null;
}

export async function getGuests(): Promise<Guest[]> {
  const response = await api.get<Guest[]>(`/profile/answers`, {});

  return response.data;
}

export async function updateUser(userId: string, user: Partial<User>): Promise<User> {
  const response = await api.patch<User>(`/profile/${userId}`, user);

  return response.data;
}

export async function deleteUserById(userId: string): Promise<User> {
  const response = await api.delete<User>(`/profile/${userId}`);

  return response.data;
}

export async function likeCardUserById(userId: string, tmplLink: string): Promise<User> {
  const response = await api.patch<User>(`/profile/${userId}/like`, {
    tmplLink,
  });

  return response.data;
}

export async function dislikeCardUserById(userId: string, tmplLink: string): Promise<User> {
  const response = await api.patch<User>(`/profile/${userId}/dislike`, {
    tmplLink,
  });

  return response.data;
}

export async function checkUser(user: ICheckUser): Promise<unknown> {
  const response = await api.post<User>(`/login`, user);

  return response.data;
}
