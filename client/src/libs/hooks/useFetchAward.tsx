import { GetAwardApi, ResponseGetAwardDataInner } from '@utils/api';
import { useState } from 'react';

export const useFetchAward = () => {
  const [awards, setAwards] = useState<ResponseGetAwardDataInner[]>();

  new GetAwardApi().getAward().then((res) => {
    if (res.data) {
      setAwards(res.data.data);
    }
  });

  const refetch = () => {
    new GetAwardApi().getAward().then((res) => {
      if (res.data) {
        setAwards(res.data.data);
      }
    });
  };
  return { awards, refetch };
};
