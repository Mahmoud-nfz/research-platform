"use client";
import React, { useState } from "react";
import { renameObject } from "../minioFunctions";

const RenameObject: React.FC = () => {
    const [bucketName, setBucketName] = useState<string>("");
    const [oldName, setOldName] = useState<string>("");
    const [newName, setNewName] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleRenameObject = async () => {
        try {
            await renameObject(bucketName, oldName, newName);
            setError("");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Rename Object</h2>
            <input type="text" value={bucketName} onChange={(e) => setBucketName(e.target.value)} placeholder="Bucket Name" />
            <input type="text" value={oldName} onChange={(e) => setOldName(e.target.value)} placeholder="Old Object Name" />
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New Object Name" />
            <button onClick={handleRenameObject}>Rename Object</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default RenameObject;
