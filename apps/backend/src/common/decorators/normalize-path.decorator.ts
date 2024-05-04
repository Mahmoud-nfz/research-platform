import { Transform, TransformOptions } from 'class-transformer';
import path from 'path';

export function NormalizePath(
	transformOptions?: TransformOptions
): (target: any, key: string) => void {
	return Transform(({ value }) => {
		return typeof value === 'string'
			? path.normalize(value.concat('/'))
			: value;
	}, transformOptions);
}
