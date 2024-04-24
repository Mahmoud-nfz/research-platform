import React from 'react';
import "./file-upload/page";
import Upload from './file-upload/page';
import ListObjectsInBucket from './list-rename-delete/listObjectsInBucket';

export default function App() {
    return (
        <Upload />
        // <ListObjectsInBucket />
    );
}