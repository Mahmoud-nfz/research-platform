import { ProviderTokens } from '@/common/provider-tokens';
import { FactoryProvider, Scope, Type } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';

export const LoggerContextProvider: FactoryProvider<string> = {
	provide: ProviderTokens.LOGGER_CONTEXT,
	scope: Scope.TRANSIENT,
	inject: [INQUIRER],
	useFactory: (parentClass: Type) => parentClass?.constructor?.name,
};
