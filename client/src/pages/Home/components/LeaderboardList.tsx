import React, { useEffect, useState } from 'react';
import { Colors } from '@libs/colors';
import { Flex, Grid, Select, Text } from '@chakra-ui/react';
import { useFetchAwardById, useFetchGamification } from '@libs/hooks';
import LeaderboardTable from './LeaderboardTable';
import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';
import { RestCreateGamificationAwardsInner } from '@utils/api';
import { isPast } from 'date-fns';

const LeaderboardList: React.FC = () => {
  const { gamifications } = useFetchGamification();
  const [onlyUser] = useAtom(userInfoAtom);
  const gam = gamifications?.filter((gami) => (!onlyUser.groupId || (gami.groupId === onlyUser.groupId)
    && !isPast(new Date(gami.gamificationEndDate)))
  );

  const [selectedGamificationId, setSelectedGamificationId] = useState<string | undefined | null>(
    null,
  );

  useEffect(() => {
    if (gam && gam.length > 0 && selectedGamificationId === null) {
      setSelectedGamificationId(gam[0]?.id);
    }
  }, [gam]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGamificationId(event.target.value);
  };

  const gamificationInfo = gam?.find((ga) => ga.id === selectedGamificationId);
  const gamificationNameString = gamificationInfo?.gamificationName || '';

  // const awardsString = gamificationInfo?.awards
  //   ?.map(
  //     (award) =>
  //       `${a} - ${award.awardMinPercentage} - ${award.awardMaxPercentage}%`
  //   )
  //   .join(', ');

  return (
    <>
      <Grid templateColumns="1fr 1fr" gap={4}>
        <Flex align="center">
          <Text marginLeft="10" color={Colors.primary} fontSize={'22px'}>
            Урамшууллын нэрийг сонгоно уу : </Text>
          <Select
            borderColor={Colors.primary}
            paddingY="40px"
            paddingLeft="25px"
            width={'20%'}
            onChange={handleSelectChange}
            defaultValue={gam?.[0]?.id}
          >
            {gam?.map((gamification, index) => (
              <option key={index} value={gamification.id}>
                {gamification.gamificationName}
              </option>
            ))}
          </Select>
        </Flex>
      </Grid>
      {selectedGamificationId && (
        <Text
          color={Colors.primary}
          marginLeft={'40px'}
          marginTop={'-20px'}
          fontStyle={'italic'}
          fontSize={'15px'}
        >
          {gamificationNameString}
          {' урамшуулалд дараах цолнууд байна. Үүнд: '}
          {gamificationInfo?.awards
            ?.map<React.ReactNode>(
              (award) =>
                (<AwardLabel award={award} />)
            )
            .reduce((prev, curr) => [prev, ', ', curr])}
        </Text>
      )}
      <LeaderboardTable selectedGamificationId={selectedGamificationId} />
    </>

  );

};

// const OngoingGamification = () =>
// {
//   const {gamifications} = useFetchGamification();
//   const [onlyUser] = useAtom(userInfoAtom);
//   const gam = gamifications?.filter((gami) => !onlyUser.groupId || gami.groupId === onlyUser.groupId);
//   const isAdmin = onlyUser.role === 'Admin';
//   const OngoingGamification =  gamifications?.filter((gami) => !isPast(new Date(gami.gamificationEndDate)));
//   const [selectedGamificationId, setSelectedGamificationId] = useState<string | undefined | null>(
//     null,
//   );

//   useEffect(() => {
//     if (gam && gam.length > 0 && selectedGamificationId === null) {
//       setSelectedGamificationId(gam[0]?.id);
//     }
//   }, [gam]);

//   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedGamificationId(event.target.value);
//   };

//   if (isAdmin === true)
//   {
//     return <>
//      <LeaderboardTable />
//     </>
//   }
// }

const AwardLabel = ({ award }: { award: RestCreateGamificationAwardsInner }) => {
  const a = useFetchAwardById(award.awardId).award?.name;

  return <>{`${a} - (${award.awardMinPercentage} - ${award.awardMaxPercentage}%)`}</>
}

export default LeaderboardList;
