import { AxiosError } from "axios";

export const isAxiosError = (value: unknown): value is AxiosError =>
  value instanceof AxiosError;
