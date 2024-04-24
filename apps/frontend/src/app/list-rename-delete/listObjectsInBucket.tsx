
"use client";
import React, { useState } from "react";
import axios from "axios";

export default function ListObjectsInBucket() {
    const [bucketName, setBucketName] = useState("");
    const [objects, setObjects] = useState<string[]>([]);
    const [error, setError] = useState("");

    const handleBucketNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBucketName(event.target.value);
    };

    const handleGetObjects = async () => {
        try {
            if (!bucketName.trim()) {
                setError("Please enter a bucket name.");
                return;
            }
            const response = await axios.get(`http://localhost:1206/bucket/${bucketName}/objects`);
            setObjects(response.data.objects);
            setError("");
        } catch (error) {
            console.error("Error fetching objects:", error);
            setError("Error fetching objects. Please try again.");
        }
    };

    return (
        <div>
            <h1>Enter Bucket Name</h1>
            <input type="text" value={bucketName} onChange={handleBucketNameChange} />
            <button onClick={handleGetObjects}>Get Objects</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h2>Objects in Bucket:</h2>
            <ul>
                {objects.map((object, index) => (
                    <li key={index}>{object}</li>
                ))}
            </ul>
        </div>
    );
}
