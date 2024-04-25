import React, { useState } from "react";
import { getObjects } from "../../../services/crud.service";
import { copyObject } from "../../../services/crud.service";

const CopyObjects: React.FC = () => {
    const [sourceBucketName, setSourceBucketName] = useState<string>("");
    const [targetBucketName, setTargetBucketName] = useState<string>("");
    const [objects, setObjects] = useState<string[]>([]);
    const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const handleGetObjects = async () => {
        try {
            await getObjects(sourceBucketName, setObjects, setError);
        } catch (error) {
            console.error("Error getting objects:", error);
            setError("Error getting objects. Please try again.");
        }
    };

    const handleCopyObjects = async () => {
        try {
            for (const objectName of selectedObjects) {
                await copyObject(sourceBucketName, targetBucketName, objectName);
                console.log("Object copied:", objectName);
            }
        } catch (error) {
            console.error("Error copying objects:", error);
            setError((error as Error).message);
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
            <h1>Copy multiple objects between Buckets</h1>
            <h2>List Objects</h2>
            <input type="text" value={sourceBucketName} onChange={(e) => setSourceBucketName(e.target.value)} placeholder="Enter Source Bucket Name" />
            <input type="text" value={targetBucketName} onChange={(e) => setTargetBucketName(e.target.value)} placeholder="Enter Target Bucket Name" />
            <button onClick={handleGetObjects}>Get Objects</button>
            
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h3>Objects in Source Bucket:</h3>
            <ul>
                {objects.map((object, index) => (
                    <li key={index}>
                        <input type="checkbox" checked={selectedObjects.includes(object)} onChange={() => handleCheckboxChange(object)} />
                        {object}
                    </li>
                ))}
            </ul>
            <button onClick={handleCopyObjects}>Copy Selected Objects</button>
        </div>
    );
};

export default CopyObjects;
