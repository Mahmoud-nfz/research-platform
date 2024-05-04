import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator';
import path from 'path';

export function IsPathString(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'isPathString',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: string): Promise<boolean> | boolean {
					return path.isAbsolute(path.normalize(value));
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must be a valid absolute path.`;
				},
			},
		});
	};
}
