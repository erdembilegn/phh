import { GetGamificationApi, ResponseGetGamificationDataInner } from '@utils/api';
import { SetStateAction, useEffect, useState } from 'react';

export const useFetchGamification = () => {
  const [gamifications, setGamifications] = useState<ResponseGetGamificationDataInner[]>();

  useEffect(() => {
    new GetGamificationApi().getGamification().then((res) => {
      if (res.data) {
        setGamifications(res.data.data);
      }
    });
  }, [setGamifications]);

  const refetch = () => {
    new GetGamificationApi.getGamification().then(
      (res: { data: { data: SetStateAction<ResponseGetGamificationDataInner[] | undefined> } }) => {
        if (res.data) {
          setGamifications(res.data.data);
        }
      },
    );
  };
  return { gamifications, refetch };
};
