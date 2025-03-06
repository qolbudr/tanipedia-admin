export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface ApiParameter<Type> {
  url?: string;
  path?: string;
  method: ApiMethod;
  query?: any;
  body?: Object;
  headers?: HeadersInit;
}

const generateURLQueryParam = ({
  body,
  listKey,
}: {
  body: any;
  listKey?: string[];
}): string => {
  var query = '';

  Object.keys(body).forEach((key) => {
    if (body[key] == null || (key == 'search' && body[key] == '')) {
    } else if (Array.isArray(body[key])) {
      query += `${(body[key] as Array<any>).map(
        (v) =>
          `${listKey != null ? `${listKey.join('.')}.` : ''}${key}=${
            body[key]
          }&`
      )}`;
    } else if (typeof body[key] === 'object') {
      query += generateURLQueryParam({
        body: body[key],
        listKey: [...(listKey ?? []), key],
      });
    } else {
      query += `${listKey != null ? `${listKey.join('.')}.` : ''}${key}=${
        body[key]
      }&`;
    }
  });

  return query;
};

export async function api<Type>({
  url,
  path,
  method,
  headers,
  body,
  query,
}: ApiParameter<Type>): Promise<Type | undefined> {
  try {
    const token = localStorage.getItem('token');

    let newUrl = url ?? `${path}`;

    if (query != null) newUrl += `?${generateURLQueryParam({ body: query })}`;

    const response = await fetch(newUrl, {
      method: method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        Authorization: token ?? '',
      },
      body: JSON.stringify(body),
    });

    if (response.status != 200) throw await response.json();

    const json = (await response.json()) as Type | undefined;
    return json;
  } catch (e) {
    throw e;
  }
}
