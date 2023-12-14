import { userInfoAtom } from '@libs/jotai';
import { GetUserByIdApi } from '@utils/api';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const token = Cookies.get('token');
  useEffect(() => {
    if (
      (userInfo.id === null ||
        userInfo.id.length === 0 ||
        userInfo.firstName === null ||
        userInfo.firstName.length === 0 ||
        userInfo.lastName === null ||
        userInfo.lastName.length === 0 ||
        userInfo.email === null ||
        userInfo.email.length === 0 ||
        userInfo.role === null ||
        userInfo.role.length === 0) &&
      token
    ) {
      const decodedToken = jwt.decode(token ?? '') as {
        id: string;
        iat: number;
        exp: number;
      } | null;
      const id = decodedToken?.id ?? '';
      new GetUserByIdApi()
        .getUserById(id, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data.data) {
            setUserInfo({
              email: res.data.data?.email,
              firstName: res.data.data?.firstName,
              lastName: res.data.data?.lastName,
              id,
              groupId: res.data.data?.groupId,
              role: res.data.data?.role,
            });
          }
        });
    }
  }, [userInfo, token, setUserInfo]);
};
