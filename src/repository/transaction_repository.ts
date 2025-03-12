import { api, ApiMethod } from "@utils/api";
import { MainReponse } from "@utils/types";

export class TransactionRepository {
  static getSeller = async (): Promise<MainReponse<any> | undefined> => {
    try {
      const response = await api<MainReponse<any>>({
        url: '/api/transaction/seller',
        method: ApiMethod.GET,
      });

      return response;
    } catch (e) {
      throw e;
    }
  }

  static getAdmin = async (): Promise<MainReponse<any> | undefined> => {
    try {
      const response = await api<MainReponse<any>>({
        url: '/api/transaction/admin',
        method: ApiMethod.GET,
      });

      return response;
    } catch (e) {
      throw e;
    }
  }
}