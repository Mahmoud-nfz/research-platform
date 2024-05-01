"use server";

import { endpoints } from "@/constants";
import { Project } from "@/types/entities";
import { fetcher } from "@/utils/fetcher";

export async function createProject(data: Partial<Project>) {
  return fetcher(endpoints.createProject, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
