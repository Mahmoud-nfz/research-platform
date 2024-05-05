import { SetMetadata, applyDecorators } from '@nestjs/common';
import { Request } from 'express';

export const PERMISSION_KEY = 'permission';

export const RequirePermission = (
	subject: (req: Request) => string | string[],
	...actions: string[]
) => applyDecorators(SetMetadata(PERMISSION_KEY, { subject, actions }));
