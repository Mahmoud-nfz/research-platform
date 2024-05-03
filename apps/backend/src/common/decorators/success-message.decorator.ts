import { SetMetadata } from '@nestjs/common';

export const SUCCESS_MESSAGE_KEY = 'SUCCESS_MESSAGE_KEY';
export const SuccessMessage = (message: string) =>
	SetMetadata(SUCCESS_MESSAGE_KEY, message);
