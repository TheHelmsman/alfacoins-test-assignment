import { LogLevelDesc } from 'loglevel';

export {};

declare global {
  var BACKEND_URL: string;
  var PATH_DAILY: string;
  var LOCALE: string;
  var ENV: string;
  var LOG_LEVEL: LogLevelDesc;
}
