import { Article } from '@prisma/client';
import { api, ApiMethod } from '@utils/api';
import { MainReponse } from '@utils/types';

export class ArticleRepository {
  static getArticles = async ({
    limit,
    offset,
    search,
  }: {
    limit: number;
    offset: number;
    search: string;
  }): Promise<MainReponse<Article[]> | undefined> => {
    try {
      const response = await api<MainReponse<Article[]>>({
        url: '/api/articles',
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

  static deleteArticle = async ({ id }: { id: string }) : Promise<MainReponse<undefined> | undefined> => {
    try {
      const response = await api<MainReponse<undefined>>({
        url: '/api/article/' + id,
        method: ApiMethod.DELETE,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static editArticle = async ({ id }: { id: string }) : Promise<MainReponse<Article> | undefined> => {
    try {
      const response = await api<MainReponse<Article>>({
        url: '/api/article/' + id,
        method: ApiMethod.GET,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static updateArticle = async ({ id, title, description, content, image }: { id: string, title: string, description: string, content: string, image?: FileList  }) : Promise<MainReponse<undefined>> => {
    try {
      const token = localStorage.getItem('token');
      let data = new FormData()
      if(image) data.append('image', image[0])
      data.append('title', title)
      data.append('description', description)
      data.append('content', content)

      const response = await fetch('/api/article/update/' + id, 
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

  static addArticle = async ({ title, description, content, image }: { title: string, description: string, content: string, image: FileList  }) : Promise<MainReponse<undefined>> => {
    try {
      const token = localStorage.getItem('token');
      let data = new FormData()
      data.append('image', image[0])
      data.append('title', title)
      data.append('description', description)
      data.append('content', content)

      const response = await fetch('/api/article', 
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
