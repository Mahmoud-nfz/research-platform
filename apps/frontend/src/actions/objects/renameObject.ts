"use server";

import { endpoints } from "@/constants";
import { fetcher } from "@/utils/fetcher";

export async function renameObject(
  bucketName: string,
  oldName: string,
  newName: string
) {
  return fetcher(endpoints.renameObject(bucketName), {
    method: "POST",
    body: JSON.stringify({ oldName, newName }),
    base: process.env.MINIO_WRAPPER_HTTP_URL as string,
  });
}
