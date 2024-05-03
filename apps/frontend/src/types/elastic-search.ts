export type ElasticCreateMetaData = {
	data: {
		objectName: string;
		description: string;
		tags: string[];
		path: string;
		type: string;
	};
};

export type ElasticSearchMetaData = ElasticCreateMetaData & {
	id: string;
};
