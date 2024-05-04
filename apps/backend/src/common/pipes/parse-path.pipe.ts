import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import path from 'path';

@Injectable()
export class ParsePathPipe implements PipeTransform<any, string> {
	transform(value: any): string {
		try {
			const isAbsolutePath = path.isAbsolute(path.normalize(value));
			if (!isAbsolutePath)
				throw new BadRequestException('Invalid absolute path');
		} catch (error) {
			throw new BadRequestException('Invalid absolute path', { cause: error });
		}
		return path.normalize(value);
	}
}
