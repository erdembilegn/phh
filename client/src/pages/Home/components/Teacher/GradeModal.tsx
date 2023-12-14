import {
  Button,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { GradeModalText } from '@libs/text';
import { GradeModalProps } from '../../model';
import { useFetchAssessment, useFetchUser, useFetchGrade } from '@libs/hooks';

interface ExtendedGradeModalProps extends GradeModalProps {
  gamificationId: string;
  assessmentId: string;
  groupId: string;
}

const GradeModal: React.FC<ExtendedGradeModalProps> = (props) => {
  const fetchedUsers = useFetchUser();
  const users = fetchedUsers?.users || [];
  const students = users.filter((user) => user.role.includes('Student'));

  const assessments = useFetchAssessment();
  const grades = useFetchGrade();

  const {
    isGradeOpen,
    onGradeClose,
    registerGrade,
    handleGradeSubmit,
    onGradeSubmit,
    isGradeLoading,
    gamificationId,
    assessmentId,
    groupId,
    setValue,
  } = props;
  const selectedAssessment = assessments.assessments?.filter(
    (assess) => assess.id === assessmentId,
  );
  const studentGroup = students.filter((user) => user.groupId?.includes(props.groupId));
  return (
    <>
      <Modal
        isOpen={isGradeOpen}
        onClose={onGradeClose}
        isCentered
        size={'3xl'}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent style={{ height: '65%' }}>
          <ModalHeader>
            <Heading size={'md'} color={Colors.primary}>
              {GradeModalText.name}
            </Heading>
          </ModalHeader>
          <ModalCloseButton color={Colors.primary} />
          <ModalBody >
            <form onSubmit={handleGradeSubmit(onGradeSubmit)} className="gap-y-2 flex flex-col">
              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary} fontWeight={'semibold'} fontSize={'18px'}>
                  {GradeModalText.assessmentName}
                </Text>
                {selectedAssessment &&
                  selectedAssessment.map((assess, _) => {
                    return (
                      <Text fontWeight={'semibold'} color={Colors.primary} fontSize={'18px'}>
                        {assess.assessmentName}
                      </Text>
                    );
                  })}
              </Grid>
              <Grid templateColumns={'repeat(3,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary} fontWeight={'semibold'}>
                  #
                </Text>
                <Text color={Colors.primary} fontWeight={'semibold'}>
                  {GradeModalText.studentName}
                </Text>
                <Text color={Colors.primary} fontWeight={'semibold'}>
                  {GradeModalText.grade}
                </Text>
              </Grid>

              <Grid style={{ overflowY: 'scroll' }}>
                {studentGroup?.map((user, index) => (
                  <Grid key={user.id} templateColumns={'repeat(3,1fr)'} alignItems={'center'}>
                    <Text color={Colors.primary} >{index + 1}</Text>
                    <Text color={Colors.primary} >{user.firstName}</Text>

                    <NumberInput
                      defaultValue={1}
                      min={0}
                      max={100}
                      size="md"
                      key={user.id} 
                      borderColor={Colors.primary}
                      onChange={(_, value) => {
                        setValue(`values.${index}.gradeNumber`, value),
                          setValue(`values.${index}.userId`, user.id),
                          setValue(`values.${index}.assessmentId`, assessmentId),
                          setValue(`values.${index}.gamificationId`, gamificationId);
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Grid>
                ))}
              </Grid>
            </form>
            <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
              <Button
                onClick={onGradeClose}
                variant={'outline'}
                color={Colors.primary}
                borderColor={Colors.primary}
              >
                {GradeModalText.cancel}
              </Button>
              <Button
                onClick={handleGradeSubmit(onGradeSubmit)}
                type="submit"
                backgroundColor={Colors.primary}
                color={'white'}
                isLoading={isGradeLoading}
              >
                {GradeModalText.create}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GradeModal;
