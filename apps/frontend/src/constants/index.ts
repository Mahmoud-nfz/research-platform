export * as endpoints from './endpoints';

export const DEFAULT_CHUNK_SIZE = 1024 * 256;
export const MAX_WORKER_NUM =
	typeof window === 'undefined'
		? 2
		: Math.max((navigator?.hardwareConcurrency ?? 4) - 2, 1);
