import { IValuteExtData } from '@/types/Daily';

export interface CbrStore {
  Valute: IValuteExtData[] | null;
  SearchQuery: string;
  toConvert: number | null;
  converted: number | null;
  rate: number | null;
  selectedValute: string;
  reversed: boolean;
  reversedRate: number | null;
}
