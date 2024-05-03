"use client";

import { createDataCollection } from "@/actions/projects/createDataCollection";
import { DataCollection } from "@/types/entities";
import { useMutation } from "@tanstack/react-query";

export default function useCreateDataCollection() {
  return useMutation({
    mutationFn: async (data: Partial<DataCollection>) => {
      return createDataCollection(data);
    },
  });
}
