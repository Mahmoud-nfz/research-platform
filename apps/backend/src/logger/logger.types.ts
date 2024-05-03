export enum LogLevel {
	/**
	 * The *fatal* log level indicates
	 * a very severe error event occurred that causes the application to abort.
	 * The application enters an unwanted state and can no longer continue to function.
	 */
	fatal = 'fatal',
	/**
	 * The *crit* log level indicates
	 * an error occurred that was not expected to happen.
	 * The error caused the process in which it occurred to stop execution.
	 *
	 * @notes
	 * This level will help detect unhandled unwanted states in the application.
	 */
	crit = 'crit',
	/**
	 * The *error* log level indicates
	 * an error occurred that was expected to happen but caused
	 * the process in which it occurred to stop execution.
	 */
	error = 'error',
	/**
	 * The *warn* log level indicates
	 * the application entered an unwanted state that was expected to happen
	 * and that it **did not** cause the process in which it occurred to **stop execution**.
	 */
	warn = 'warn',
	/**
	 * The *info* log level indicates
	 * important information on the state of the application
	 * and that the application is working as expected.
	 *
	 * @notes
	 * Don't have too many *info* messages.
	 * We typically have < 5% *info* messages relative to *trace*.
	 */
	info = 'info',
	/**
	 * The *trace* log level captures the execution of code
	 * and contains information normally of use only when debugging.
	 *
	 * @notes
	 * The *trace* log level is by far the most commonly used severity
	 * and should provide context to understand the steps leading up to errors and warnings.
	 */
	trace = 'trace',
}

/**
 * The levels sub object holds information on the priority of the log level.
 * Smaller number means bigger priority.
 */
export const logLevels: {
	levels: { [key in LogLevel]: number };
	colors: { [key in LogLevel]: string };
} = {
	levels: {
		[LogLevel.fatal]: 0,
		[LogLevel.crit]: 1,
		[LogLevel.error]: 2,
		[LogLevel.warn]: 3,
		[LogLevel.info]: 4,
		[LogLevel.trace]: 5,
	},
	colors: {
		[LogLevel.fatal]: 'bold red',
		[LogLevel.crit]: 'magenta',
		[LogLevel.error]: 'red',
		[LogLevel.warn]: 'yellow',
		[LogLevel.info]: 'green',
		[LogLevel.trace]: 'gray',
	},
};

export type LogOptions = {
	context?: string;
	meta?: {
		[key: string]: any;
	};
};
