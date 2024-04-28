import { getServerSession } from "next-auth";
import * as process from "process";
import { ResponseType } from "@/types";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const fetcher = async <R = never>(
  path: string | undefined,
  request_options?: RequestInit & {
    token?: string;
  },
  tags?: string[]
): Promise<ResponseType<R>> => {
  if (path === undefined) throw new Error("Incorrect path");

  const url = new URL(path, process.env.BACKEND_URL);

  const session = await getServerSession(options);
  const token = request_options?.token ?? session?.accessToken;

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...request_options?.headers,
  };

  return fetch(url.href, {
    ...request_options,
    headers,
    next: { tags, revalidate: tags ? 600 : 0 },
  }).then(async (response) => {
    const ok = response.ok;
    const { data, message } = await response.json();

    if (!ok) {
      throw new Error(message);
    }

    return { data, message };
  });
};
