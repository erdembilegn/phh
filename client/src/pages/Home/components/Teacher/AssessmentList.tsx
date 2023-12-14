import React, { useEffect, useState } from 'react';
import { Colors } from '@libs/colors';
import { Flex, Grid, Select, Text } from '@chakra-ui/react';
import { useFetchGamification, useFetchUser } from '@libs/hooks';
import TeacherAssessmentTable from './TeacherAssessment';
import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';

const AssessmentList: React.FC = () => {
  const [onlyUser] = useAtom(userInfoAtom);


  const { gamifications } = useFetchGamification();
  const gam = gamifications?.filter((gami) => gami.groupId === onlyUser.groupId);


  const [selectedGamificationId, setSelectedGamificationId] = useState<string | undefined | null>(
    null,
  );

  useEffect(() => {
    if (gam && gam.length > 0) {
      setSelectedGamificationId(gam[0]?.id);
    }
  }, [gam]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGamificationId(event.target.value);
  };

  return (
    <>
      <Grid templateColumns="1fr 1fr" gap={4}>
      <Flex  align="center">
      <Text marginLeft="10" color={Colors.primary} fontSize={'22px'}>
          Урамшууллын нэрийг сонгоно уу : </Text>
        <Select
          borderColor={Colors.primary}
          paddingY="40px"
          paddingLeft="25px"
          width={'20%'}
          onChange={handleSelectChange}
        >
          {gam?.map((gamification, index) => (
            <option key={index} value={gamification.id}>
              {gamification.gamificationName}
            </option>
          ))}
        </Select>
      </Flex>
    </Grid>
     <TeacherAssessmentTable selectedGamificationId={selectedGamificationId} />
    </>
    
  );
};

export default AssessmentList;
