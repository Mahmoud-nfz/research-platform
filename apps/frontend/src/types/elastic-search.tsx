export type SearchResult = {
        id: string;
        data: {
            objectName: string;
            description: string;
            tags: string[];
            path: string;
            type: string;
        };
    }
