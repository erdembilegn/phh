import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Grid, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text, Tfoot, useDisclosure, useToast } from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { useFetchAssessment, useFetchUser } from '@libs/hooks';
import { AssessmentTableText } from '@libs/text';
import { format } from 'date-fns';
import { formatName } from '@utils/functions';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AssessmentForm } from 'src/pages/Home/model';
import AssessmentUpdateModal from './AssessmentUpdateModal';
import AssessmentDeleteModal from './AssessmentDeleteModal';
import { UpdateAssessmentApi } from '@utils/api';


let count = undefined;
let deactive = undefined;


const AssessmentTable: React.FC = () => {
  const { users } = useFetchUser();
  const { refetch, assessments } = useFetchAssessment();
  const toast = useToast({ position: 'top' });
  const [assessmentId, setAssessmentId] = useState<string>('')
  const [isAssessmentUpdateLoading, setIsAssessmentUpdateLoading] = useState<boolean>(false);
  const [isAssessmentDeleteLoading] = useState<boolean>(false);
  const { isOpen: isAssessmentUpdateOpen, onOpen: onAssessmentUpdateOpen, onClose: onAssessmentUpdateClose } = useDisclosure();
  const { isOpen: isAssessmentDeleteOpen, onOpen: onAssessmentDeleteOpen, onClose: onAssessmentDeleteClose } = useDisclosure();
  const handleAssessmentUpdateOpen = (clickedAwardId: string) => {
    setAssessmentId(clickedAwardId);
    onAssessmentUpdateOpen();
  };

  const handleAssessmentDeleteOpen = (clickedAwardId: string) => {
    setAssessmentId(clickedAwardId);
    onAssessmentDeleteOpen();
  };
  const {
    register: registerAssessmentUpdate,
    handleSubmit: handleAssessmentUpdateSubmit,
  } = useForm<AssessmentForm>();
  const onAssessmentUpdateSubmit: SubmitHandler<AssessmentForm> = async (data) => {
    new UpdateAssessmentApi()
      .updateAssessment({
        id: assessmentId,
        assessmentName: data.name,
      })
      .then((res) => {
        if (res.data) {
          toast({
            status: 'success',
            title: 'Амжилттай засагдлаа.',
            isClosable: true,
          });
          onAssessmentUpdateClose();
          refetch();
        }
      })
      .catch((err) => {
        toast({
          status: 'error',
          title: 'something went wrong',
          description: err.message,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsAssessmentUpdateLoading(false);
      });
  };

  const activeAssessments = assessments?.filter(item => item.gamifications.length > 0);
  count = activeAssessments?.length;
  const deactiveAssessments = assessments?.filter(item => item.gamifications.length <= 0);
  deactive = deactiveAssessments?.length;

  return (
    <>
      <Grid>
        <Heading color={Colors.primary} fontSize={'26px'}>
          {AssessmentTableText.heading}
        </Heading>
        <Text color={Colors.primary} marginTop={'10px'}
          fontStyle={'italic'} fontSize={'15px'}>{AssessmentTableText.description}</Text>
      </Grid>
      <TableContainer style={{ height: '400px', position: 'relative' }} overflowY="auto" bgColor={'white'} marginTop={'15px'}>
        <Table overflowY={'auto'} style={{ position: 'relative' }}>
          <Thead bgColor={'#353D75'} style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <Tr className="[&>th]:text-white">
              <Th>#</Th>
              <Th>{AssessmentTableText.name}</Th>
              <Th>{AssessmentTableText.createdUser}</Th>
              <Th>{AssessmentTableText.createdDate}</Th>
              <Th>{AssessmentTableText.isActive}</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          {assessments &&
            assessments.map((item, index) => {

              const created = users?.filter((user) => user.id === item.createdUser);
              return (
                <Tbody>
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.assessmentName}</Td>
                    {created?.map((user, _) => {
                      return (<Td>{formatName(user.firstName, user.lastName)}</Td>)
                    })}
                    <Td>{format(new Date(item.createdAt), 'yyyy-MM-dd')}</Td>
                    <Td><Button colorScheme='#353D75' variant='outline' size={'sm'} cursor={'default'} >{item.gamifications.length > 0 ? AssessmentTableText.active : AssessmentTableText.deactive}</Button></Td>
                    <Td><Button size={'sm'}
                      leftIcon={<EditIcon />}
                      _hover={{ background: "white" }}
                      bgColor={'white'}
                      onClick={() => handleAssessmentUpdateOpen(item.id)}>
                    </Button>
                    </Td>
                    <Td><Button size={'sm'}
                      leftIcon={<DeleteIcon
                      color={'#E75454'} />}
                      isDisabled={item.gamifications.length > 0}
                      _hover={{ background: "white" }}
                      bgColor={'white'}
                      onClick={() => handleAssessmentDeleteOpen(item.id)}>
                    </Button>
                    </Td>
                  </Tr>
                </Tbody>
              );
            })}
          <Tfoot >
            <Tr >
              <Td colSpan={2} textAlign="left">
                {`Нийт идэвхтэй үнэлгээ: ${count}`}
              </Td>
              <Td colSpan={3} textAlign="left" >
                {`Нийт идэвхгүй үнэлгээ: ${deactive}`}
              </Td>

            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <AssessmentUpdateModal
        isAssessmentUpdateOpen={isAssessmentUpdateOpen}
        onAssessmentUpdateClose={onAssessmentUpdateClose}
        registerAssessmentUpdate={registerAssessmentUpdate}
        handleAssessmentUpdateSubmit={handleAssessmentUpdateSubmit}
        onAssessmentUpdateSubmit={onAssessmentUpdateSubmit}
        isAssessmentUpdateLoading={isAssessmentUpdateLoading}
      />
      <AssessmentDeleteModal
        isAssessmentDeleteOpen={isAssessmentDeleteOpen}
        onAssessmentDeleteClose={onAssessmentDeleteClose}
        isAssessmentDeleteLoading={isAssessmentDeleteLoading}
        assessmentId={assessmentId}
        refetchTable={refetch}
      />
    </>
  );
};

export default AssessmentTable;
