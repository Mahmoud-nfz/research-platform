"use client";
import React from "react";
import Upload from"./components/uploadObject";
import ListObjects from "./components/listObjects";
import DeleteObject from "./components/deleteObject";
import RenameObject from "./components/renameObject";
import CopyObjects from "./components/copyObjects";
import Download from "./components/downloadObject";


const BucketOperationsPage: React.FC = () => {
    return (
        <div>
            <Download />
            <br />
            <h1>*******</h1>
            <Upload />
            <br />
            <h1>*******</h1>
            <CopyObjects />
            <br />
            <h1>*******</h1>
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
