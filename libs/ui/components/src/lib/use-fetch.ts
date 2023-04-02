import { SetStateAction, useEffect } from 'react';

interface UseFetchEffectProps {
  endpoint: string;
  setter: SetStateAction<any>;
  default: any;
}

const baseUrl = 'http://localhost:3333/api';

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
