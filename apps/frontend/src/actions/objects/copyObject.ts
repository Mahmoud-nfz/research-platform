"use server";

import { endpoints } from "@/constants";
import { fetcher } from "@/utils/fetcher";

export async function copyObject(
  sourceBucket: string,
  destinationBucket: string,
  objectName: string
) {
  return fetcher(
    endpoints.copyObject(sourceBucket, destinationBucket, objectName),
    { method: "POST", base: process.env.MINIO_WRAPPER_HTTP_URL as string }
  );
}
