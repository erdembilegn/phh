import { GetAwardByIdApi, ResponseGetAwardByIdData} from '@utils/api';
import { useEffect, useState } from 'react';

export const useFetchAwardById = (awardId: string) => {
  const [award, setAward] = useState<ResponseGetAwardByIdData>();

  useEffect(() => {
    const fetchAwardById = async () => {
      try {
        const response = await new GetAwardByIdApi().getAwardById(awardId);
        if (response.data) {
          setAward(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching award by ID:', error);
      }
    };

    fetchAwardById();
  }, [awardId]);

  const refetch = () => {
    // Implement refetch logic if needed
  };

  return { award, refetch };
};
