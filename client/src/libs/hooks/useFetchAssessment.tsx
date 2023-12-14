import { GetAsessmentApi, ResponseGetAssessmentDataInner } from '@utils/api';
import { useEffect, useState } from 'react';

export const useFetchAssessment = () => {
  const [assessments, setAssessments] = useState<ResponseGetAssessmentDataInner[]>();

  useEffect(() => {
    new GetAsessmentApi().getAssessment().then((res) => {
      if (res.data) {
        setAssessments(res.data.data);
      }
    });
  }, [setAssessments]);

  const refetch = () => {
    new GetAsessmentApi().getAssessment().then((res) => {
      if (res.data) {
        setAssessments(res.data.data);
      }
    });
  };
  return { assessments, refetch };
};
