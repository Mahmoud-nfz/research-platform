import { Transform, TransformOptions } from 'class-transformer';

export interface TrimOptions {
	/** @default 'both' */
	strategy?: 'start' | 'end' | 'both';
}

export function Trim(
	options?: TrimOptions,
	transformOptions?: TransformOptions
): (target: any, key: string) => void {
	return Transform((value: unknown) => {
		if ('string' !== typeof value) {
			return value;
		}

		switch (options?.strategy) {
			case 'start':
				return value.trimStart();
			case 'end':
				return value.trimEnd();
			default:
				return value.trim();
		}
	}, transformOptions);
}
