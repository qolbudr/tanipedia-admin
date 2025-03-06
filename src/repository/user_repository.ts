import { Users } from "@prisma/client";
import { api, ApiMethod } from "@utils/api";
import { MainReponse } from "@utils/types";

export class UserRepository {
  static getUsers = async ({limit, offset, search}: {limit: number, offset: number, search: string}): Promise<MainReponse<Users[]> | undefined> => {
    try {
      const response = await api<MainReponse<Users[]>>({
        url: '/api/users',
        method: ApiMethod.GET,
        query: {
          limit: limit,
          offset: offset,
          search: search,
        }
      });

      return response;
    } catch (e) {
      throw e;
    }
  };
}