import React, { useState } from 'react';
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useFetchAssessment, useFetchGamification, useFetchGrade } from '@libs/hooks';
import GradeModal from './GradeModal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GradeForm } from '../../model';
import { Colors } from '@libs/colors';
import { CreateGradeApi } from '@utils/api';
import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';

interface TeacherAssessmentTableProps {
  selectedGamificationId: string | null | undefined;
}
interface IDS {
  assessmentId: string;
  groupId: string;
  selectedGamificationId: string;
}

const TeacherAssessmentTable: React.FC<TeacherAssessmentTableProps> = ({
  selectedGamificationId,
}) => {
  const [userInfo] = useAtom(userInfoAtom);
  const toast = useToast({ position: 'top' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen: isGradeOpen, onOpen: onGradeOpen, onClose: onGradeClose } = useDisclosure();
  const {
    register: registerGrade,
    handleSubmit: handleGradeSubmit,
    control: gradeFormControl,
    reset,
    setValue,
  } = useForm<GradeForm>({
    defaultValues: {
      values: [
        {
          gradeNumber: 1,
          assessmentId: '1',
          userId: '1',
          gamificationId: '1',
          createdUser: '1',
        },
      ],
    },
  });
  const { gamifications } = useFetchGamification();
  const { assessments } = useFetchAssessment();
  const selectedGamification = gamifications?.find((g) => g.id === selectedGamificationId);
  const [id, setId] = useState<IDS>();

  const openGradeModal = (
    assessmentId: string,
    groupId: string,
    selectedGamificationId: string,
  ) => {
    // Pass gamificationId, assessmentId, and groupId to onOpen
    if (!selectedGamification) {
      // Data is not available yet, you might want to render a loading state or return null.
      return null;
    }
    onGradeOpen();

    setId({
      assessmentId,
      groupId,
      selectedGamificationId,
    });
  };

  const { refetch } = useFetchGrade();
  const onGradeSubmit: SubmitHandler<GradeForm> = async (data) => {

    new CreateGradeApi().createGrade(
      {
        assessmentId: data.values.at(1)?.assessmentId ?? '',
        createdUser: userInfo.id ,
        gamificationId: data.values.at(1)?.gamificationId ?? "",
        user: data.values.map((user) => {
          return {
            userId: user.userId,
            gradeNumber: user.gradeNumber
          };
        })
      }
    )

    // data.values.map((item) =>
    //   new CreateGradeApi()
    //     .createGrade({
    //       assessmentId: item.assessmentId,
    //       createdUser: item.createdUser,
    //       gamificationId: item.gamificationId,
    //       user: [
    //         {
    //           gradeNumber: item.gradeNumber,
    //           userId: item.userId
    //         }
    //       ]
    //     })
    //     .then((res) => {
    //       if (res.data) {
    //         toast({
    //           status: 'success',
    //           title: 'Амжилттай үүслээ',
    //           isClosable: true,
    //         });
    //         onGradeClose();
    //         refetch();
    //       }
    //     })
    //     .catch((err) => {
    //       toast({
    //         status: 'error',
    //         title: 'something went wrong',
    //         description: err.message,
    //         isClosable: true,
    //       });
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     }),
    // );

    
  };

  return (
    <>
      <TableContainer style={{ height: '530px' }} overflowY="auto" bgColor={'white'}>
        <Table>
          <Thead backgroundColor={'#353D75'} textColor={'white'}>
            <Td>#</Td>
            <Td>Үнэлгээний нэр</Td>
            <Td></Td>
          </Thead>
          <Tbody>
            {selectedGamification &&
              selectedGamification.assessments &&
              selectedGamification.assessments.map((assessmentId, index) => {
                const result = assessments?.find((a) => a.id === assessmentId.assessmentId);
                return (
                  <>
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{result && result.assessmentName}</Td>
                      <Td>
                        <Button
                          onClick={() => {
                            openGradeModal(
                              assessmentId.assessmentId,
                              selectedGamification.groupId,
                              selectedGamification.id,
                            );
                          }}
                          bgColor={Colors.primary}
                          color={'white'}
                          className="flex gap-1"
                        >
                          Дүн оруулах
                        </Button>
                      </Td>
                    </Tr>
                    <GradeModal
                      isGradeOpen={isGradeOpen}
                      registerGrade={registerGrade}
                      onGradeClose={() => {
                        onGradeClose();
                        reset();
                      }}
                      handleGradeSubmit={handleGradeSubmit}
                      onGradeSubmit={onGradeSubmit}
                      isGradeLoading={isLoading}
                      setValue={setValue}
                      formControl={gradeFormControl}
                      gamificationId={id?.selectedGamificationId ?? ''}
                      assessmentId={id?.assessmentId ?? ''}
                      groupId={id?.groupId ?? ''}
                    />
                  </>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TeacherAssessmentTable;
