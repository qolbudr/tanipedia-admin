import { Article, Product } from '@prisma/client';
import { api, ApiMethod } from '@utils/api';
import { MainReponse } from '@utils/types';

export class ProductRepository {
  static getProducts = async ({
    limit,
    offset,
    search,
  }: {
    limit: number;
    offset: number;
    search: string;
  }): Promise<MainReponse<Product[]> | undefined> => {
    try {
      const response = await api<MainReponse<Product[]>>({
        url: '/api/products',
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

  static deleteProduct = async ({ id }: { id: number }) : Promise<MainReponse<undefined> | undefined> => {
    try {
      const response = await api<MainReponse<undefined>>({
        url: '/api/product/' + id,
        method: ApiMethod.DELETE,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static editProduct = async ({ id }: { id: number }) : Promise<MainReponse<Product> | undefined> => {
    try {
      const response = await api<MainReponse<Product>>({
        url: '/api/product/' + id,
        method: ApiMethod.GET,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static updateProduct = async ({ id, name, description, category, price, unit, image }: { id: number, description : string, name: string, category: string, price: string, unit: string, image?: FileList  }) : Promise<MainReponse<undefined>> => {
    try {
      const token = localStorage.getItem('token');
      let data = new FormData()
      if(image) data.append('image', image[0])
      data.append('name', name)
      data.append('description', description)
      data.append('category', category)
      data.append('price', price)
      data.append('unit', unit)

      const response = await fetch('/api/product/update/' + id, 
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

  static addProduct = async ({ name, description, category, price, unit, image }: { description : string, name: string, category: string, price: string, unit: string, image: FileList  }) : Promise<MainReponse<undefined>> => {
    try {
      const token = localStorage.getItem('token');
      let data = new FormData()
      data.append('image', image[0])
      data.append('name', name)
      data.append('description', description)
      data.append('category', category)
      data.append('price', price)
      data.append('unit', unit)

      const response = await fetch('/api/product', 
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
