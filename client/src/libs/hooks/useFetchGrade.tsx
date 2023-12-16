import { GetGradeApi, ResponseGetGradeDataInner } from '@utils/api';
import { useEffect, useState } from 'react';

export const useFetchGrade = () => {
  const [grades, setGrades] = useState<ResponseGetGradeDataInner[]>([]);

  useEffect(() => {
    new GetGradeApi().getGrade().then((res) => {
      if (res.data) {
        setGrades(res.data?.data ?? []);
      }
    });
  }, [setGrades]);

  const refetch = () => {
    new GetGradeApi().getGrade().then((res) => {
      if (res.data) {
        setGrades(res.data?.data ?? []);
      }
    });
  };
  return { grades, refetch };
};
