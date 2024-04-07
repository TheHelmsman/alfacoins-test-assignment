export interface IValuteSelect {
  name: string; //  "Австралийский доллар",
  id: string; // "R01010"
}

export interface IValuteData {
  ID: string; // "R01010"
  NumCode: string; // "036"
  CharCode: string; //  "AUD",
  Nominal: number; //  1
  Name: string; //  "Австралийский доллар",
  Value: number; //  60.8018,
  Previous: number; //  60.2285
}

export interface IValuteExtData extends IValuteData {
  trend?: number; //  UP | DOWN | SAME
  diff?: string; //  +0.5733
  pair?: string; // AUD - RUB
  rate?: string; //  1 AUD - 60.8018 RUB
  reversed_rate?: string; //  1 RUB - 0.0164
  reversed?: number; // 0.0164
}

export type Valute = Record<string, IValuteData>;

export interface IDaily {
  Date: string; //  "2024-04-06T11:30:00+03:00"
  PreviouseDate: string; //  "2024-04-05T11:30:00+03:00"
  PreviousURL: string; //  //www.cbr-xml-daily.ru/archive/2024/04/05/daily_json.js
  Timestamp: string; //  2024-04-07T19:00:00+03:00
  Valute: Valute;
}
