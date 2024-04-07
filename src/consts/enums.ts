import { LogLevelDesc, levels } from 'loglevel';

export const LOG_LEVEL: LogLevelDesc = globalThis.LOG_LEVEL ?? levels.SILENT;
