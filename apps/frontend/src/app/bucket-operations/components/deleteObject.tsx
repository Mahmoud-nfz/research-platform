"use client";
import React, { useState } from "react";
import { getObjects, deleteObject } from "../minioWrapperCalls";

const ListObjects: React.FC = () => {
    const [bucketName, setBucketName] = useState<string>("");
    const [objects, setObjects] = useState<string[]>([]);
    const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const handleGetObjects = async () => {
        try {
            await getObjects(bucketName, setObjects, setError);
        } catch (error) {
            console.error("Error getting objects:", error);
        }
    };

    const handleDeleteObjects = async () => {
        try {
            for (const objectName of selectedObjects) {
                await deleteObject(bucketName, objectName);
                setObjects((prevObjects) => prevObjects.filter((obj) => obj !== objectName));
            }
            setSelectedObjects([]); // Clear selected objects after deletion
        } catch (error) {
            console.error("Error deleting objects:", error);
        }
    };

    const handleCheckboxChange = (objectName: string) => {
        setSelectedObjects((prevSelected) => {
            if (prevSelected.includes(objectName)) {
                return prevSelected.filter((obj) => obj !== objectName);
            } else {
                return [...prevSelected, objectName];
            }
        });
    };

    return (
        <div>
            <h1>Delete multiple objects in Bucket</h1>
            <h2>List Objects</h2>
            <input type="text" value={bucketName} onChange={(e) => setBucketName(e.target.value)} placeholder="Enter Bucket Name" />
            <button onClick={handleGetObjects}>Get Objects</button>
            
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h3>Objects in Bucket:</h3>
            <ul>
                {objects.map((object, index) => (
                    <li key={index}>
                        <input type="checkbox" checked={selectedObjects.includes(object)} onChange={() => handleCheckboxChange(object)} />
                        {object}
                    </li>
                ))}
            </ul>
            <button onClick={handleDeleteObjects}>Delete Selected Objects</button>
        </div>
    );
};

export default ListObjects;
