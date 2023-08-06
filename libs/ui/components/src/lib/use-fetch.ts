import { Sdk } from '@unteris/shared/sdk';
import { SetStateAction, useEffect } from 'react';

interface UseFetchEffectProps {
  endpoint: string;
  setter: SetStateAction<any>;
  default: any;
}

const baseUrl = import.meta.env.VITE_SERVER_URL;

export const sdk = new Sdk(baseUrl);

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
