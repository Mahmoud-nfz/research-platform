"use server";

import { endpoints } from "@/constants";
import { fetcher } from "@/utils/fetcher";

export async function getObjects(bucketName: string) {
  return fetcher<{ name: string; size: number }[]>(
    endpoints.getObjects(bucketName),
    {
      method: "GET",
      base: process.env.MINIO_WRAPPER_HTTP_URL as string,
    }
  );
}
