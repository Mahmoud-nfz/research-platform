'use client';
import { searchObjectsMetadata } from '@/actions/metadata/searchObjectsMetadata';
import { useState } from 'react';

const SearchPage = () => {
	const [query, setQuery] = useState('');
	const [searchResults, setSearchResults] = useState<
		{ objectName: string; descriptionSnippet: string; path: string }[]
	>([]);

	const handleSearch = async () => {
		try {
			const results = await searchObjectsMetadata(query);
			setSearchResults(results);
		} catch (error) {
			console.error('Error searching:', error);
		}
	};

	return (
		<div>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Enter search query"
			/>
			<button onClick={handleSearch}>Search</button>

			<ul>
				{searchResults.map((result, index) => (
					<li key={index}>
						<h3>{result.objectName}</h3>
						<p>{result.descriptionSnippet}</p>
						<p>{result.path}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchPage;
