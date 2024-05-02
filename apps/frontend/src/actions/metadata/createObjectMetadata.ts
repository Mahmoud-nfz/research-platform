"use server";

import { endpoints } from "@/constants";
import { ElasticCreateMetaData } from "@/types/elastic-search";
import { fetcher } from "@/utils/fetcher";

export async function createObjectMetadata(metadata: ElasticCreateMetaData) {
  return fetcher(endpoints.createObjectMetadata, {
    method: "POST",
    body: JSON.stringify(metadata),
    base: process.env.ELASTICSEARCH_URL as string,
  });
}
