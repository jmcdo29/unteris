import { SetStateAction, useEffect } from 'react';

interface UseFetchEffectProps {
  endpoint: string;
  setter: SetStateAction<any>;
  default: any;
}

const baseUrl = import.meta.env.VITE_SERVER_URL;

export const useFetchEffect = (props: UseFetchEffectProps) => {
  useEffect(() => {
    let ignore = false;
    const getFetchReq = async () => {
      const req = await fetch(`${baseUrl}/${props.endpoint}`, {
        credentials: 'include',
      });
      const data = await req.json();
      if (!ignore) {
        props.setter(data);
      }
    };
    getFetchReq();
    return () => {
      ignore = true;
      props.setter(props.default);
    };
  }, [props.setter]);
};

interface GetFetchProps {
  endpoint: string;
}

export const getFetch = async (props: GetFetchProps) => {
  const res = await fetch(`${baseUrl}/${props.endpoint}`, {
    credentials: 'include',
  });
  return res.json();
};

const refreshCsrfToken = async () => {
  const res = await fetch(`${baseUrl}/session/refresh`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error(
      'There was an error while refreshing the CSRF token. Contact the site developer'
    );
  }
};

interface PostFetchProps {
  endpoint: string;
  body: Record<string, any>;
  csrfToken: string;
  headers?: Record<string, string>;
}

export const postFetch = async <T extends Record<string, any>>(
  props: PostFetchProps
): Promise<T> => {
  try {
    const res = await fetch(`${baseUrl}/${props.endpoint}`, {
      method: 'POST',
      body: JSON.stringify(props.body),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-unteris-csrf-protection': props.csrfToken,
        ...props.headers,
      },
    });
    if (!res.ok) {
      throw new Error(
        JSON.stringify({ status: res.status, body: await res.json() })
      );
    }
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      const { status, body } = JSON.parse(e.message);
      if (status === 403) {
        await refreshCsrfToken();
        return await postFetch(props);
      }
      throw e;
    } else {
      throw e;
    }
  }
};
