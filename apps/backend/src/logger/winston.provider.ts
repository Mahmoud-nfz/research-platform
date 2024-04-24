import { ProviderTokens } from '@common/provider-tokens';
import { APP_NAME } from '@common/constants';
import { FactoryProvider, Scope } from '@nestjs/common';
import * as colors from 'colors-cli';
import { format, LoggerOptions, transports } from 'winston';

import { ConfigService } from '@/config';
import { LogLevel, logLevels } from '@/logger/logger.types';

export const WinstonProvider: FactoryProvider = {
  provide: ProviderTokens.WINSTON_CONFIG,
  scope: Scope.TRANSIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): LoggerOptions => {
    const { debug, level } = configService.getMiscConfig();
    return {
      handleExceptions: true,
      levels: logLevels.levels,
      transports: [
        new transports.Console({
          stderrLevels: [LogLevel.error, LogLevel.fatal],
          consoleWarnLevels: [LogLevel.warn],
          format: debug ? getCliFormat() : getDebugFormat(),
        }),
      ],
      level: level,
    };
  },
};

function getDebugFormat() {
  return format.combine(
    format.timestamp(),
    format.label({ label: APP_NAME, message: false }),
    format.ms(),
    format.json({ space: 2 }),
  );
}

function getCliFormat() {
  return format.combine(
    format.timestamp({
      format: () =>
        new Date().toLocaleString([], {
          dateStyle: 'short',
          timeStyle: 'medium',
        }),
    }),
    format.label({
      label: APP_NAME,
      message: false,
    }),
    format.ms(),
    format.colorize({ all: true, colors: logLevels.colors }),
    format.json({ space: 2 }),
    format.printf((info) => {
      const log_message = '';
      const app_name = colors.blue_bt(`[${info['label']}]`);
      const level =
        info.level.slice(0, 5) +
        info.level.slice(5, -5).toUpperCase() +
        info.level.slice(-5);
      const context = info['context']
        ? colors.yellow(`[${info['context']}]`)
        : '';
      const { timestamp, message, meta } = info;
      const ms = colors.yellow(info.ms);
      return log_message.concat(
        app_name,
        ' - ',
        timestamp,
        ' \t ',
        level,
        ' ',
        context,
        ' ',
        message,
        ' ',
        ms,
        ...(meta
          ? Object.entries(meta)
              .filter(([, value]) => !!value)
              .map(([key, value]: [string, any]) => [
                '\n',
                '  ',
                key.toUpperCase(),
                ': ',
                value,
              ])
              .flat()
          : []),
      );
    }),
  );
}
