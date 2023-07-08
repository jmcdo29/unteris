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
      const req = await fetch(`${baseUrl}/${props.endpoint}`);
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

interface PostFetchProps {
  endpoint: string;
  body: Record<string, any>;
  csrfToken: string;
  headers?: Record<string, string>;
}

export const postFetch = async <T extends Record<string, any>>(
  props: PostFetchProps
): Promise<T> => {
  const res = await fetch(`${baseUrl}/${props.endpoint}`, {
    method: 'POST',
    body: JSON.stringify(props.body),
    headers: {
      'Content-Type': 'application/json',
      'X-UNTERIS-CSRF-TOKEN': props.csrfToken,
      ...props.headers,
    },
  });
  return res.json();
};
