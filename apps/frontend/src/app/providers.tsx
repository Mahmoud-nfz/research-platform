'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ReactNode, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: ReactNode }) {
	const queryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 1,
					},
					mutations: {
						retry: 1,
					},
				},
			}),
		[]
	);

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<>{children}</>
				<Toaster position="bottom-right" />
			</SessionProvider>
		</QueryClientProvider>
	);
}
