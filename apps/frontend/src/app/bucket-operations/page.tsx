'use client';
import React from 'react';
import Upload from '../../components/upload/uploadObject';
import ListObjects from '../../components/upload/listObjects';
import DeleteObject from '../../components/upload/deleteObject';
import RenameObject from '../../components/upload/renameObject';
import CopyObjects from '../../components/upload/copyObjects';

const BucketOperationsPage: React.FC = () => {
	return (
		<div>
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
