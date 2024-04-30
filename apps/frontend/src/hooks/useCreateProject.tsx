"use client";

import { createProject } from "@/actions/projects/createProject";
import { Project } from "@/types/entities";
import { useMutation } from "@tanstack/react-query";

export default function useCreateProject() {
  return useMutation({
    mutationFn: async (data: Partial<Project>) => {
      return createProject(data);
    },
  });
}
