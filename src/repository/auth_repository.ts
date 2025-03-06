import { Users } from '@prisma/client';
import { api, ApiMethod } from '@utils/api';
import { MainReponse } from '@utils/types';

export class AuthRepository {
  static login = async (email: string, password: string): Promise<MainReponse<Users> | undefined> => {
    try {
      const response = await api<MainReponse<Users>>({
        url: '/api/auth/login',
        method: ApiMethod.POST,
        body: {
          'email': email,
          'password': password
        }
      });

      localStorage.setItem('user', JSON.stringify(response?.data));
      localStorage.setItem('token', JSON.stringify(response?.token));

      return response;
    } catch (e) {
      throw e;
    }
  };

  static register = async (name: string, email: string, password: string, phone: string, address: string, photo: FileList): Promise<MainReponse<undefined>> => {
    try {
      let data = new FormData()
      data.append('photo', photo[0])
      data.append('email', email)
      data.append('name', name)
      data.append('password', password)
      data.append('phone', phone)
      data.append('address', address)

      const response = await fetch('/api/auth/signup', { method: 'POST', body: data })
      const json = await response.json();
      if(response.status != 200) throw json;
      return json as MainReponse<undefined>;
    } catch (e) {
      throw e;
    }
  };
}
