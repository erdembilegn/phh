import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';

import { Grid, Heading, Image, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { useFetchAward, useFetchGamification, useFetchGrade, useFetchUser } from '@libs/hooks';
import { MyAwardText } from '@libs/text';
import { Colors } from '@libs/colors';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { ResponseGetAwardDataInner, ResponseGetGamificationDataInner } from '@utils/api';

const MyAward: React.FC = () => {
  const { awards } = useFetchAward();
  const [onlyUser] = useAtom(userInfoAtom);
  const { users } = useFetchUser();
  const { grades } = useFetchGrade();
  const { gamifications } = useFetchGamification();
  const gradeUser = grades?.filter((grade) => grade.userId === onlyUser.id);

  const sum = useMemo(() => {
    const sum: Record<string, number> = {};

    gradeUser?.map((item, index) => {
      const correspondingGamification = gamifications?.filter(
        (gamification) => gamification.id === item.gamificationId,
      );
      {
        correspondingGamification?.map((gam, gamindex) => {
          //console.log('gamiindex', gamindex)
          gam.assessments &&
            gam.assessments.map((assess, assindex) => {
              if (assess.assessmentId === item.assessmentId && gam.id === item.gamificationId) {
                sum[gam.id] =
                  (sum[gam.id] ?? 0) + (assess.assessmentPercentage * item.gradeNumber) / 100;
              }
            });
        });
      }
    });
    return sum;
  }, [gradeUser, gamifications]);
  console.log('sum', sum);

  const award = useMemo(() => {
    return Object.keys(sum)
      .map((gamificationId) => {
        const gamification = gamifications?.find(({ id }) => id === gamificationId)

        return {
          id: gamificationId,
          grade: sum[gamificationId],
          gamification: gamification,
          award: awards?.find((award) => {
            const gamAward = gamification?.awards.find(({ awardId }) => awardId === award.id);
            return gamAward && gamAward.awardMaxPercentage >= sum[gamificationId] && gamAward.awardMinPercentage <= sum[gamificationId];
          })
        };
      })
  }, [sum, gamifications]);

  console.log('award', award);



  return (
    <>
      <Grid templateColumns="0.6fr 0.4fr">
        <Grid padding={'50px'}>
          <Heading color={Colors.primary} fontSize={'26px'}>
            {MyAwardText.current}
          </Heading>
          <TableContainer style={{ height: '530px' }} overflowY="auto">
            <Table overflowY={'auto'} size={"sm"} marginTop={"20px"} style={{ borderCollapse: "separate", borderSpacing: "0 0.5em" }} color={Colors.primary}>
              {award &&
                award
                  .filter(({ award, gamification }) => {
                    return award !== undefined && gamification?.gamificationEndDate &&
                    new Date(gamification?.gamificationEndDate) > new Date()  
                  })
                  .map((item) => (<Award {...item} />))}
            </Table>
          </TableContainer>
        </Grid>
        <Grid padding={'50px'} bgColor={"#DFDFE6"}>
          <Heading color={Colors.primary} fontSize={'26px'}>{MyAwardText.past}</Heading>
          <TableContainer style={{ height: '530px' }} overflowY="auto">
            <Table overflowY={'auto'} size={"sm"} marginTop={"20px"} style={{ borderCollapse: "separate", borderSpacing: "0 0.5em" }} color={Colors.primary}>
              {award &&
                award
                  .filter(({ award, gamification }) => {
                    return award !== undefined && gamification?.gamificationEndDate &&
                    new Date(gamification?.gamificationEndDate) < new Date()  
                  })
                  .map((item) => (<Award {...item} />))}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

type AwardProps = {
    id: string;
    grade: number;
    gamification: ResponseGetGamificationDataInner | undefined;
    award: ResponseGetAwardDataInner | undefined;
}

const Award = (item: AwardProps) => {
  return (
    <Tbody marginTop={"15px"}>
      <Tr marginTop={"15px"}>
        <Tr key={item.id}>
          <Td rowSpan={8} width={'180px'}>
            <Image src={item.award?.image} width={'120px'} height={'120px'} />
          </Td>
        </Tr>
        <Tr textAlign={'left'} width={'100px'} key={item.id} >
          Урамшууллын нэр :{' '}
          <span style={{ fontWeight: 'bold' }}>{item.gamification?.gamificationName}</span>
        </Tr>
        <Tr key={item.id} >
          Цол : {' '} <span style={{ fontWeight: 'bold' }}>{item.award?.name}</span>
        </Tr>
        <Tr key={item.id}>
          Гүйцэтгэл : {' '}
          <span style={{ fontWeight: 'bold' }}>{item.grade.toFixed(1)}%</span>
        </Tr>
        <Tr key={item.id}>
          Үргэлжлэх хугацаа: {' '}
          <span style={{ fontWeight: 'bold' }}>
            {item.gamification?.gamificationStartDate &&
              (
                <> {format(new Date(item.gamification?.gamificationStartDate), 'yyyy-MM-dd')}
                  - </>
              )}</span>
          <span style={{ fontWeight: 'bold', color: "#C84D4D" }}>
            {item.gamification?.gamificationEndDate && (
              <>
                {format(new Date(item.gamification?.gamificationEndDate), 'yyyy-MM-dd')}</>
            )}</span>
        </Tr>
      </Tr>

    </Tbody>
  );
}

export default MyAward;
