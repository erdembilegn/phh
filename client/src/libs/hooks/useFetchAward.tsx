import { GetAwardApi, ResponseGetAwardDataInner } from '@utils/api';
import { useEffect, useState } from 'react';

export const useFetchAward = () => {
  const [awards, setAwards] = useState<ResponseGetAwardDataInner[]>();

  useEffect(() => {
    new GetAwardApi().getAward().then((res) => {
      if (res.data) {
        setAwards(res.data.data);
      }
    });
  }, [setAwards]);

  const refetch = () => {
    new GetAwardApi().getAward().then((res) => {
      if (res.data) {
        setAwards(res.data.data);
      }
    });
  };
  return { awards, refetch };
};
