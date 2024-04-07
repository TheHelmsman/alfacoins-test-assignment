import http from '@/http-common';
import { AxiosResponse } from 'axios';
import { IDaily } from '@/types/Daily';

class CbrDataService {
  getDailyData(): Promise<AxiosResponse<IDaily, unknown>> {
    return http.get(`${globalThis.PATH_DAILY}`);
  }
}

export default CbrDataService;
