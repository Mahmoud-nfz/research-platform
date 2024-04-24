"use client";
import React from "react";
import Upload from"./components/uploadObject";
import ListObjects from "./components/listObjects";
import DeleteObject from "./components/deleteObject";
import RenameObject from "./components/renameObject";

const BucketOperationsPage: React.FC = () => {
    return (
        <div>
            <h1>Upload to Minio :</h1>
            <Upload />
            <br />
            <h1>*******</h1>

            <h1>Bucket Operations :</h1>
            <ListObjects />
            <br />
            <h1>*******</h1>
            <DeleteObject />
            <br />
            <h1>*******</h1>
            <RenameObject />
        </div>
    );
};

export default BucketOperationsPage;
