import React from 'react';
import { Grid, Image, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { useFetchAward, useFetchGamification, useFetchGrade, useFetchUser } from '@libs/hooks';
import { Colors } from '@libs/colors';
import { useMemo } from 'react';
import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';
import { formatName } from '@utils/functions';

interface TeacherAssessmentTableProps {
    selectedGamificationId: string | null | undefined;
}

const LeaderboardTable: React.FC<TeacherAssessmentTableProps> = ({
    selectedGamificationId, }) => {
    const { awards } = useFetchAward();
    const [onlyUser] = useAtom(userInfoAtom);
    const { users } = useFetchUser();
    const { grades } = useFetchGrade();
    const { gamifications } = useFetchGamification();
    const groupUser = users?.filter((user) => !onlyUser.groupId || user.groupId === onlyUser.groupId);
    const groupGamification = gamifications?.filter((gam) => gam.id === selectedGamificationId);
    const gradeUser = grades?.filter((grade) => groupUser?.find((user) => user.id === grade.userId));

    const sum = useMemo(() => {
        const sum: {
            userId: string,
            gamificationId: string,
            grade: number,
        }[] = [];

        gradeUser?.map((item, _) => {
            const correspondingGamification = groupGamification?.filter(
                (gamification) => gamification.id === item.gamificationId,
            );
            {
                correspondingGamification?.map((gam, _) => {

                    gam.assessments &&
                        gam.assessments.map((assess, _) => {
                            if (assess.assessmentId === item.assessmentId && gam.id === item.gamificationId) {
                                const existingIndex = sum.findIndex((e) => e.gamificationId === gam.id && e.userId === item.userId);
                                if (existingIndex < 0)
                                    sum.push({
                                        userId: item.userId,
                                        gamificationId: gam.id,
                                        grade: ((assess.assessmentPercentage * item.gradeNumber) / 100),
                                    });
                                else {
                                    sum[existingIndex].grade = (sum[existingIndex].grade + ((assess.assessmentPercentage * item.gradeNumber) / 100));
                                }
                            }
                        });
                });
            }
        });
        return sum;
    }, [gradeUser, groupGamification]);
    console.log('sum', sum);

    const award = useMemo(() => {
        return sum
            .map((e) => {
                const gamification = groupGamification?.find(({ id }) => id === e.gamificationId);

                return {
                    id: e.gamificationId,
                    grade: e.grade,
                    userId: e.userId,
                    gamification: gamification,
                    award: awards?.find((award) => {
                        const gamAward = gamification?.awards.find(({ awardId }) => awardId === award.id);
                        return gamAward && gamAward.awardMaxPercentage >= e.grade && gamAward.awardMinPercentage <= e.grade;
                    })
                };
            })
    }, [sum, groupGamification]);

    const sortedAwards = [...award].sort((a, b) => b.grade - a.grade);

    return (
        <>
            <Grid padding={'20px'} justifyContent="center">
                <TableContainer style={{ height: '330px', fontWeight: '500' }} overflowY="auto" color={Colors.primary} fontSize={'18px'}>
                    <Table overflowY={'auto'} width={"800px"}>
                        {sortedAwards && sortedAwards
                            .filter(({ award }) => award !== undefined)
                            .map((item, index) => {
                                {
                                    return (
                                        <><Tbody>
                                        <Tr key={item.id}>
                                            <Td fontSize={'24px'}>{index + 1} </Td>
                                            {groupUser &&
                                                groupUser
                                                .filter((user) => user.id === item.userId)
                                                .map((filteredUser, userIndex) => (
                                                <Td key={userIndex}>{formatName(filteredUser.firstName, filteredUser.lastName)}</Td>
                                                ))}
                                            <Td>{item.grade.toFixed(1)}%</Td>
                                            <Td>
                                                <Image src={item.award?.image} width={'30px'} height={'30px'} />
                                            </Td>
                                            </Tr>
                                        </Tbody></>
                                    );
                                }
                            })}
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
};

export default LeaderboardTable;
