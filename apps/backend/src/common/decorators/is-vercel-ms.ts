import {
	isNotEmpty,
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator';
import ms from 'ms';

export function IsVercelMs(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'isVercelMs',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: string | number): Promise<boolean> | boolean {
					return typeof value === 'string'
						? !isNaN(ms(value))
						: isNotEmpty(ms(value));
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must be a valid Vercel Microseconds (ms) format.`;
				},
			},
		});
	};
}
