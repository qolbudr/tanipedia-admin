import { Users } from '@prisma/client';
import { api, ApiMethod } from '@utils/api';
import { MainReponse } from '@utils/types';

export class UserRepository {
  static getUsers = async ({
    limit,
    offset,
    search,
  }: {
    limit: number;
    offset: number;
    search: string;
  }): Promise<MainReponse<Users[]> | undefined> => {
    try {
      const response = await api<MainReponse<Users[]>>({
        url: '/api/users',
        method: ApiMethod.GET,
        query: {
          limit: limit,
          offset: offset,
          search: search,
        },
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static deleteUser = async ({ id }: { id: string }) : Promise<MainReponse<undefined> | undefined> => {
    try {
      const response = await api<MainReponse<undefined>>({
        url: '/api/user/' + id,
        method: ApiMethod.DELETE,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static editUser = async ({ id }: { id: string }) : Promise<MainReponse<Users> | undefined> => {
    try {
      const response = await api<MainReponse<Users>>({
        url: '/api/user/' + id,
        method: ApiMethod.GET,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static updateUser = async ({ id, user }: { id: string, user: Users }) : Promise<MainReponse<Users> | undefined> => {
    try {
      const response = await api<MainReponse<Users>>({
        url: '/api/user/' + id,
        method: ApiMethod.POST,
        body: {
          ...user
        }
      });

      return response;
    } catch (e) {
      throw e;
    }
  };
}
