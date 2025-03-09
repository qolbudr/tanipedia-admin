import { Article, PohonDana } from '@prisma/client';
import { api, ApiMethod } from '@utils/api';
import { MainReponse } from '@utils/types';

export class PohonDanaRepository {
  static getPohonDanas = async ({
    limit,
    offset,
    search,
  }: {
    limit: number;
    offset: number;
    search: string;
  }): Promise<MainReponse<PohonDana[]> | undefined> => {
    try {
      const response = await api<MainReponse<PohonDana[]>>({
        url: '/api/pohon-danas',
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

  static deletePohonDana = async ({ id }: { id: number }) : Promise<MainReponse<undefined> | undefined> => {
    try {
      const response = await api<MainReponse<undefined>>({
        url: '/api/pohon-dana/' + id,
        method: ApiMethod.DELETE,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static editPohonDana = async ({ id }: { id: number }) : Promise<MainReponse<PohonDana> | undefined> => {
    try {
      const response = await api<MainReponse<PohonDana>>({
        url: '/api/pohon-dana/' + id,
        method: ApiMethod.GET,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static updatePohonDana = async ({ id, title, description, link, image }: { id: number, title: string, description: string, link: string, image?: FileList  }) : Promise<MainReponse<undefined>> => {
    try {
      const token = localStorage.getItem('token');
      let data = new FormData()
      if(image) data.append('image', image[0])
      data.append('title', title)
      data.append('description', description)
      data.append('link', link)

      const response = await fetch('/api/pohon-dana/update/' + id, 
        { 
          method: 'POST', 
          body: data, 
          headers: {
            'Authorization': token,
          } as HeadersInit
        }
      )
      const json = await response.json();
      if(response.status != 200) throw json;
      return json as MainReponse<undefined>;
    } catch (e) {
      throw e;
    }
  };

  static addPohonDana = async ({ title, description, link, image }: { title: string, description: string, link: string, image: FileList  }) : Promise<MainReponse<undefined>> => {
    try {
      const token = localStorage.getItem('token');
      let data = new FormData()
      data.append('image', image[0])
      data.append('title', title)
      data.append('description', description)
      data.append('link', link)

      const response = await fetch('/api/pohon-dana', 
        { 
          method: 'POST', 
          body: data, 
          headers: {
            'Authorization': token,
          } as HeadersInit
        }
      )
      const json = await response.json();
      if(response.status != 200) throw json;
      return json as MainReponse<undefined>;
    } catch (e) {
      throw e;
    }
  };
}
