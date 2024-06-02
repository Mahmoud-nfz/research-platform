'use client';

import SearchPage from '../components/general/search/SearchPage';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	router.push('/platform');
	return <SearchPage />;
}
