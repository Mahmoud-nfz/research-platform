"use client";

import { createObjectMetadata } from "@/actions/metadata/createObjectMetadata";
import { CHUNK_SIZE, endpoints } from "@/constants";
import { ElasticCreateMetaData } from "@/types/elastic-search";
import { UploadSchema } from "@/types/schemas";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export default function useUploadFile() {
  return useMutation({
    mutationFn: async ({
      data,
      setUploadProgress,
    }: {
      data: UploadSchema;
      setUploadProgress: Dispatch<SetStateAction<number>>;
    }) => {
      // create metadata first
      const metadata: ElasticCreateMetaData = {
        data: {
          objectName: data.files[0].name,
          description: data.description ?? "",
          tags: data.tags ?? [],
          path: data.path ?? "",
          type: data.selectedFileType ?? "Raw Data",
        },
      };
      await createObjectMetadata(metadata);

      // upload object second
      const folderName = data.parentFolder;
      const bucketName = "ddfdfdc";
      const selectedFile = data.files;
      const updatedFileName = bucketName + "/" + selectedFile.name;
      const updatedFile = new File([selectedFile], updatedFileName, {
        type: selectedFile.type,
      });
      const url = new URL(
        endpoints.upload,
        process.env.NEXT_PUBLIC_MINIO_WRAPPER_WEBSOCKET_URL
      );
      const socket = new WebSocket(url);

      const sendBucketName = () => {
        const btt = updatedFileName + "/" + folderName;
        socket.send(btt);
      };

      const sendNextChunk = (offset: number = 0) => {
        const chunkSize = Math.min(CHUNK_SIZE, updatedFile.size - offset);
        const chunk = updatedFile.slice(offset, offset + chunkSize);
        const reader = new FileReader();

        reader.onload = (event) => {
          const result = event.target?.result;
          if (result instanceof ArrayBuffer) {
            socket.send(result);
            offset += chunkSize;
            setUploadProgress((offset / updatedFile.size) * 100);
            if (offset < updatedFile.size) {
              sendNextChunk();
            } else {
              socket.close();
            }
          } else {
            throw new Error("Unexpected result type", { cause: result });
          }
        };

        reader.readAsArrayBuffer(chunk);
      };

      socket.onopen = () => {
        sendBucketName();
        sendNextChunk();
      };

      socket.onerror = (error) => {
        throw new Error("WebSocket error", { cause: error });
      };
    },
  });
}
