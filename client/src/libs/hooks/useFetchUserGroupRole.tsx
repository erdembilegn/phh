// import { GetUserByRoleAndGroupIdApi, ResponseGetUserByRoleGroup, Role } from '@utils/api';
// import { useEffect, useState } from 'react';

// export const useUserInfo = (role: Role, groupId: string) =>{
//   const [users, setUsers] = useState<ResponseGetUserByRoleGroup[]>();

//   useEffect(() => {
//     new GetUserByRoleAndGroupIdApi().getUserByRoleGroup(role, groupId).then((res) => {
//       if (res.data) {
//         setUsers(res.data.data);
//       }
//     });
//   }, [setUsers]);

//   const refetch = async () => {
//     try {
//       const response = await new GetUserByRoleAndGroupIdApi().getUserByRoleGroup({role, groupId});
//       if (response.data) {
//         setUsers(response.data.data as ResponseGetUserByRoleGroup[]);
//       }
//     } catch (error) {
//       console.error('Error refetching user data:', error);
//     }
//   };

//   return { users, refetch }}
