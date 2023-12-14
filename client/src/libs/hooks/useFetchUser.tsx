import { GetAllUserApi, ResponseGetUserData } from '@utils/api';
import { useEffect, useState } from 'react';

export const useFetchUser = () => {
  const [users, setUsers] = useState<ResponseGetUserData[]>();

  useEffect(() => {
    new GetAllUserApi().getAllUser().then((res) => {
      if (res.data) {
        setUsers(res.data.data);
      }
    });
  }, [setUsers]);

  const refetch = async () => {
    try {
      const response = await new GetAllUserApi().getAllUser();
      if (response.data) {
        setUsers(response.data.data as ResponseGetUserData[]);
      }
    } catch (error) {
      console.error('Error refetching user data:', error);
    }
  };

  return { users, refetch };
};
