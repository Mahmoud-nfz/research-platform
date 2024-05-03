'use client';

import { useMutation } from '@tanstack/react-query';
import { signOut, SignOutParams } from 'next-auth/react';

export default function useLogout() {
	return useMutation({
		mutationFn: async (options?: SignOutParams) => {
			return signOut(options);
		},
	});
}
