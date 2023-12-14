import { GetAllGroupsApi, ResponseGetGroupData } from '@utils/api';
import { useEffect, useState } from 'react';

export const useFetchGroup = () => {
  const [groups, setGroups] = useState<ResponseGetGroupData[]>();

  useEffect(() => {
    new GetAllGroupsApi().getAllGroups().then((res: any) => {
      if (res.data) {
        setGroups(res.data.data);
      }
    });
  }, [setGroups]);

  const refetch = () => {
    new GetAllGroupsApi().getAllGroups().then((res: any) => {
      if (res.data) {
        setGroups(res.data.data);
      }
    });
  };

  const getGroupNameById = (id: string): string[] | undefined => {
    const group = groups?.filter((item) => item.id === id).map((item) => item.name);
    return group;
  };
  return { groups, refetch, getGroupNameById };
};
