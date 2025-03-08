import { Users, Video, VideoCategory } from '@prisma/client';
import { api, ApiMethod } from '@utils/api';
import { MainReponse } from '@utils/types';

export class VideoRepository {
  static getVideoCategories = async ({ limit, offset, search }: { limit: number; offset: number; search: string }): Promise<MainReponse<VideoCategory[]> | undefined> => {
    try {
      const response = await api<MainReponse<VideoCategory[]>>({
        url: '/api/video/categories',
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

  static deleteVideoCategory = async ({ id }: { id: number }) : Promise<MainReponse<undefined> | undefined> => {
    try {
      const response = await api<MainReponse<undefined>>({
        url: '/api/video/category/' + id,
        method: ApiMethod.DELETE,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static editVideoCategory = async ({ id }: { id: number }) : Promise<MainReponse<VideoCategory> | undefined> => {
    try {
      const response = await api<MainReponse<VideoCategory>>({
        url: '/api/video/category/' + id,
        method: ApiMethod.GET,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static updateVideoCategory = async ({ id, videoCategory }: { id: number, videoCategory: VideoCategory }) : Promise<MainReponse<VideoCategory> | undefined> => {
    try {
      const response = await api<MainReponse<VideoCategory>>({
        url: '/api/video/category/' + id,
        method: ApiMethod.POST,
        body: {
          ...videoCategory
        }
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static createVideoCategory = async ({ title, description }: { title : string, description : string }) : Promise<MainReponse<undefined> | undefined> => {
    try {
      const response = await api<MainReponse<undefined>>({
        url: '/api/video/category',
        method: ApiMethod.POST,
        body: {
          title: title,
          description: description,
        }
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static getVideo = async ({ limit, offset, search }: { limit: number; offset: number; search: string }): Promise<MainReponse<Video[]> | undefined> => {
    try {
      const response = await api<MainReponse<Video[]>>({
        url: '/api/videos',
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

  static deleteVideo = async ({ id }: { id: number }) : Promise<MainReponse<undefined> | undefined> => {
    try {
      const response = await api<MainReponse<undefined>>({
        url: '/api/video/' + id,
        method: ApiMethod.DELETE,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static editVideo = async ({ id }: { id: number }) : Promise<MainReponse<Video> | undefined> => {
    try {
      const response = await api<MainReponse<Video>>({
        url: '/api/video/' + id,
        method: ApiMethod.GET,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static updateVideo = async ({ id, video }: { id: number, video: Video }) : Promise<MainReponse<Video> | undefined> => {
    try {
      const response = await api<MainReponse<Video>>({
        url: '/api/video/' + id,
        method: ApiMethod.POST,
        body: {
          ...video
        }
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static createVideo = async ({ title, description, link, categoryId }: { title : string, description : string, link : string, categoryId: number }) : Promise<MainReponse<undefined> | undefined> => {
    try {
      const response = await api<MainReponse<undefined>>({
        url: '/api/video',
        method: ApiMethod.POST,
        body: {
          title: title,
          description: description,
          link: link,
          categoryId: categoryId,
        }
      });

      return response;
    } catch (e) {
      throw e;
    }
  };
}
