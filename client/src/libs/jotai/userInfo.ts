import { ResponseGetUserData } from '@utils/api';
import { atom } from 'jotai';

export const userInfoAtom = atom<ResponseGetUserData>({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  groupId: '',
});
